package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.FinancialDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.FinancialVO;

public class FinancialService {
    private SqlSessionFactory sqlSessionFactory;

    public FinancialService() {
        this.sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
    }

    public FinancialVO getInfoByStockCode(String stockCode) {
        FinancialDAO financialDAO = new FinancialDAO(sqlSessionFactory);
        return financialDAO.getInfoByStockCode(stockCode);
    }
}