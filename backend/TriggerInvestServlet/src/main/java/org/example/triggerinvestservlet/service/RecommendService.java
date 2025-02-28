package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.example.triggerinvestservlet.dao.HouseholdDAO;
import org.example.triggerinvestservlet.dao.TickerDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.TickerVO;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.ops.transforms.Transforms;
import org.deeplearning4j.models.word2vec.Word2Vec;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RecommendService {
    public RecommendService() {
        loadWord2VecModel();
    }

    private Word2Vec word2VecModel;
    private void loadWord2VecModel() {
        try {
            File modelFile = new File("resources/models/GoogleNews-vectors-negative300.bin"); // 모델 경로 설정
            if (!modelFile.exists()) {
                throw new RuntimeException("Word2Vec 모델 파일을 찾을 수 없습니다: " + modelFile.getAbsolutePath());
            }
            word2VecModel = WordVectorSerializer.readWord2VecModel(modelFile);
            System.out.println("Word2Vec 모델이 성공적으로 로드되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Word2Vec 모델 로드 실패");
        }
    }

    public List<String> selectTitle(String userId) {
        List<String> list = null;
        SqlSessionFactory factory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = factory.openSession();
        try {
            HouseholdDAO householdDAO = new HouseholdDAO(sqlSession);
            list = householdDAO.selectTitle(userId);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return list;
    }

    public List<TickerVO> selectAllTicker() {
        List<TickerVO> tickerList = null;
        SqlSessionFactory factory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = factory.openSession();
        try {
            TickerDAO tickerDAO = new TickerDAO(sqlSession);
            tickerList = tickerDAO.selectAllTicker();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return tickerList;
    }

    public List<TickerVO> recommendTicker(String userId) {
        List<String> wordList = selectTitle(userId); // 사용자 키워드
        List<TickerVO> tickerList = selectAllTicker(); // 종목 리스트


        for (TickerVO ticker : tickerList) {
            String description = ticker.getDescription(); // 기업 설명
            double similarity = computeCosineSimilarity(wordList, description);
            ticker.setSimilarity(similarity);
        }

        // 유사도 기준으로 내림차순 정렬
        tickerList.sort((a, b) -> Double.compare(b.getSimilarity(), a.getSimilarity()));

        return tickerList.subList(0, Math.min(10, tickerList.size()));

    }

    private double computeCosineSimilarity(List<String> words, String description) {
        INDArray wordVector = getAverageVector(words);  // 사용자 키워드 평균 벡터
        INDArray descVector = getAverageVector(Arrays.asList(description.split(" "))); // 기업 설명 평균 벡터

        if (wordVector == null || descVector == null) {
            return 0.0;  // 벡터가 없으면 유사도 0
        }

        return Transforms.cosineSim(wordVector, descVector);  // 코사인 유사도 계산
    }

    private INDArray getAverageVector(List<String> words) {
        List<INDArray> vectors = new ArrayList<>();
        for (String word : words) {
            if (word2VecModel.hasWord(word)) {
                vectors.add(word2VecModel.getWordVectorMatrix(word));
            }
        }
        if (vectors.isEmpty()) return null;

        INDArray sumVector = vectors.get(0).dup();
        for (int i = 1; i < vectors.size(); i++) {
            sumVector.addi(vectors.get(i));
        }
        return sumVector.div(vectors.size()); // 평균 벡터 계산
    }
}