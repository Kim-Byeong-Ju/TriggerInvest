package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.vo.RelatedTickerVO;

import java.util.ArrayList;
import java.util.List;

public class RelatedTickerDAO {
    private SqlSessionFactory sqlSessionFactory;

    public RelatedTickerDAO(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    public List<RelatedTickerVO> getRelatedTickersByStockCode(String stockCode) {
        List<RelatedTickerVO> list = new ArrayList<RelatedTickerVO>();

        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            list.addAll(sqlSession.selectList("example.triggerinvestservlet.RelatedTicker.getRelatedTickersByStockCode", stockCode));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return list;
    }
}
