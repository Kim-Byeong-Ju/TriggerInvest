package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
//import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.vo.SectorWeightVO;
import org.example.triggerinvestservlet.vo.TickerVO;
import org.example.triggerinvestservlet.vo.UserVO;

import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

public class TransactionDAO {
    private SqlSession sqlSession;

    public TransactionDAO(SqlSession sqlSession) {this.sqlSession = sqlSession;}


    public List<SectorWeightVO> getSectorWeightsByUser(String userId) {

        List<SectorWeightVO> list = null;
        try {
            list = sqlSession.selectList("example.triggerinvestservlet.Transaction.getSectorWeightsByUser", userId);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        return list;
    }

    public List<TickerVO> getSectorTickers(int id) {
        List<TickerVO> list = null;
        try {
            list = sqlSession.selectList("example.triggerinvestservlet.Transaction.getSectorTickers", id);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        return list;
    }
}
