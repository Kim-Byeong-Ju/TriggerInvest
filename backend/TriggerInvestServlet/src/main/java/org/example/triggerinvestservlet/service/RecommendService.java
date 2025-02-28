package org.example.triggerinvestservlet.service;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.HouseholdDAO;
import org.example.triggerinvestservlet.dao.TickerDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.TickerVO;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class RecommendService {

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

        try {
            // 1. Flask 서버 URL
            String flaskUrl = "http://127.0.0.1:5000/get_top_tickers";

            // 2. JSON 데이터 생성
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> requestData = new HashMap<>();
            requestData.put("wordList", wordList);
            requestData.put("tickerList", tickerList);
            String jsonInputString = objectMapper.writeValueAsString(requestData);

            // 3. HTTP 요청 설정
            URL url = new URL(flaskUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            // 4. 데이터 전송
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }

            // 5. 응답 처리
            if (conn.getResponseCode() == 200) {
                JsonNode responseJson = objectMapper.readTree(conn.getInputStream());
                return objectMapper.convertValue(responseJson, new TypeReference<List<TickerVO>>() {});
            } else {
                System.err.println("Error: Flask 서버 응답 실패");
                return Collections.emptyList();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

}
