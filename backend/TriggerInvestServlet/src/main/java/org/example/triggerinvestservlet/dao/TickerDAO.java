package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.example.triggerinvestservlet.vo.TickerVO;

import java.util.List;

public class TickerDAO {
    private SqlSession sqlSession;
    public TickerDAO(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }
    public List<TickerVO> selectAllTicker() {
        List<TickerVO> tickerList = null;
        try {
            tickerList = sqlSession.selectList("example.triggerinvestservlet.Financial.selectAllTicker");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tickerList;
    }
}
