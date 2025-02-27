package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.RelatedTickerDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.RelatedTickerVO;

import java.util.List;

public class RelatedTickerService {
    private SqlSessionFactory sqlSessionFactory;

    public RelatedTickerService() {
        this.sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
    }

    public List<RelatedTickerVO> getRelatedTickersByStockCode(String stockCode) {
        RelatedTickerDAO relatedTickerDAO = new RelatedTickerDAO(sqlSessionFactory);
        return relatedTickerDAO.getRelatedTickersByStockCode(stockCode);
    }
}