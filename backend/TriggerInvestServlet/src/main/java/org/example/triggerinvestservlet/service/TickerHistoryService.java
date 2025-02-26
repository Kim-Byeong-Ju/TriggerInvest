package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.TickerHistoryDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.TickerHistoryVO;

import java.util.List;

public class TickerHistoryService {
    private SqlSessionFactory sqlSessionFactory;

    public TickerHistoryService() {
        this.sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
    }

    public List<TickerHistoryVO> getHistoriesByStockCode(String stockCode) {
        TickerHistoryDAO tickerHistoryDAO = new TickerHistoryDAO(sqlSessionFactory);
        return tickerHistoryDAO.getHistoriesByStockCode(stockCode);
    }
}