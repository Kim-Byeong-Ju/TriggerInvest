package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.example.triggerinvestservlet.vo.HouseholdVO;

import java.util.List;

public class HouseholdDAO {
    private SqlSession sqlSession;
    public HouseholdDAO(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }
    public List<HouseholdVO> selectHouseholdByUserId(String userId) {
        List<HouseholdVO> list = null;
        try {
            list = sqlSession.selectList("example.triggerinvestservlet.Household.selectHouseholdByUserId", userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    public void insertHousehold(HouseholdVO household) {
        try {
            sqlSession.insert("example.triggerinvestservlet.Household.insertHousehold", household);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<String> selectTitle(String userId) {
        List<String> list = null;
        try {
            list = sqlSession.selectList("example.triggerinvestservlet.Household.selectTitle", userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }
}
