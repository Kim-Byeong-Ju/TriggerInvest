package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.vo.FinancialVO;

public class FinancialDAO {
    private SqlSessionFactory sqlSessionFactory;

    public FinancialDAO(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    public FinancialVO getInfoByStockCode(String stockCode) {
        FinancialVO info = null;

        SqlSession sqlSession = sqlSessionFactory.openSession();
        try {
            info = sqlSession.selectOne("example.triggerinvestservlet.Financial.getInfoByStockCode", stockCode);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return info;
    }
}
