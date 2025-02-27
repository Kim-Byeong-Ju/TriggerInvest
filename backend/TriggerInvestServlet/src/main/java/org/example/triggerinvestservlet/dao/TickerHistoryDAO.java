package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.vo.TickerHistoryVO;

import java.util.ArrayList;
import java.util.List;

public class TickerHistoryDAO {
    private SqlSessionFactory sqlSessionFactory;

    public TickerHistoryDAO(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    public List<TickerHistoryVO> getHistoriesByStockCode(String stockCode) {
        List<TickerHistoryVO> list = new ArrayList<TickerHistoryVO>();

        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            list.addAll(sqlSession.selectList("example.triggerinvestservlet.TickerHistory.getHistoriesByStockCode", stockCode));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return list;
    }
}
