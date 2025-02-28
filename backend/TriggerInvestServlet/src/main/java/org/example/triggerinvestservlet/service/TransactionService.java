package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.UserDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;

import org.example.triggerinvestservlet.dao.TransactionDAO;
import org.example.triggerinvestservlet.vo.SectorWeightVO;
import org.example.triggerinvestservlet.vo.TickerVO;

import java.util.List;

public class TransactionService {

    public List<SectorWeightVO> calculateSectorWeights(String userId) {
        SqlSessionFactory sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();

        TransactionDAO transactionDAO = new TransactionDAO(sqlSession);

        return transactionDAO.getSectorWeightsByUser(userId);
    }

    public List<TickerVO> getSectorTickers(int id) {
        SqlSessionFactory sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();

        TransactionDAO transactionDAO = new TransactionDAO(sqlSession);

        return transactionDAO.getSectorTickers(id);
    }
}
