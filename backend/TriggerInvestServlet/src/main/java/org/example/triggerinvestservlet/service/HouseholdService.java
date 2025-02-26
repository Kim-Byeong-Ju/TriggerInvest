package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.example.triggerinvestservlet.dao.HouseholdDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.HouseholdVO;

import java.util.ArrayList;
import java.util.List;

public class HouseholdService {
    public HouseholdService() {}

    public List<HouseholdVO> selectHouseholdByUserId(String userId) {
        List<HouseholdVO> list = null;
        SqlSessionFactory factory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = factory.openSession();
        try {
            HouseholdDAO householdDAO = new HouseholdDAO(sqlSession);
            list = householdDAO.selectHouseholdByUserId(userId);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
        return list;
    }

    public void insertHousehold(HouseholdVO household) {
        SqlSessionFactory factory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = factory.openSession();
        try {
            HouseholdDAO householdDAO = new HouseholdDAO(sqlSession);
            householdDAO.insertHousehold(household);
            sqlSession.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }
    }
}