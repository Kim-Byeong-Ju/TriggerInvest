package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.deeplearning4j.models.embeddings.wordvectors.WordVectors;
import org.example.triggerinvestservlet.dao.HouseholdDAO;
import org.example.triggerinvestservlet.dao.TickerDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.TickerVO;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.ops.transforms.Transforms;
import org.deeplearning4j.models.word2vec.Word2Vec;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RecommendService {
    public RecommendService() {}

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
//    public List<TickerVO> recommendTicker(String userId) {
//        List<TickerVO> list = new ArrayList<>();
//        List<String> wordList = selectTitle(userId); // 사용자 키워드
//        List<TickerVO> tickerList = selectAllTicker(); // 종목 리스트
//
//        // 각 종목의 코사인 유사도를 계산하여, 유사도와 함께 저장
//        List<SimilarityResult> similarityResults = new ArrayList<>();
//
//        for (TickerVO ticker : tickerList) {
//            String description = ticker.getDescription(); // 기업 설명
//            double similarity = computeCosineSimilarity(wordList, description);
//            similarityResults.add(new SimilarityResult(ticker, similarity));
//        }
//
//        // 유사도 기준으로 내림차순 정렬
//        similarityResults.sort((a, b) -> Double.compare(b.getSimilarity(), a.getSimilarity()));
//
//        // Top 10 종목 반환
//        for (int i = 0; i < Math.min(10, similarityResults.size()); i++) {
//            list.add(similarityResults.get(i).getTicker());
//        }
//
//        return list;
//    }
//
//    private double computeCosineSimilarity(List<String> words, String description) {
//        INDArray wordVector = getAverageVector(words);  // 사용자 키워드 평균 벡터
//        INDArray descVector = getAverageVector(Arrays.asList(description.split(" "))); // 기업 설명 평균 벡터
//
//        if (wordVector == null || descVector == null) {
//            return 0.0;  // 벡터가 없으면 유사도 0
//        }
//
//        return Transforms.cosineSim(wordVector, descVector);  // 코사인 유사도 계산
//    }
//
//    private INDArray getAverageVector(List<String> words) {
//        List<INDArray> vectors = new ArrayList<>();
//        for (String word : words) {
//            if (word2VecModel.hasWord(word)) {
//                vectors.add(word2VecModel.getWordVectorMatrix(word));
//            }
//        }
//
//        if (vectors.isEmpty()) return null;
//
//        INDArray sumVector = vectors.get(0).dup();
//        for (int i = 1; i < vectors.size(); i++) {
//            sumVector.addi(vectors.get(i));
//        }
//        return sumVector.div(vectors.size()); // 평균 벡터 계산
//    }
//
//    class SimilarityResult {
//        private TickerVO ticker;
//        private double similarity;
//
//        public SimilarityResult(TickerVO ticker, double similarity) {
//            this.ticker = ticker;
//            this.similarity = similarity;
//        }
//
//        public TickerVO getTicker() {
//            return ticker;
//        }
//
//        public double getSimilarity() {
//            return similarity;
//        }
//    }
}
