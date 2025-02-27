package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.example.triggerinvestservlet.vo.HouseholdVO;
import org.example.triggerinvestservlet.vo.UserSectorVO;
import org.example.triggerinvestservlet.vo.UserVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserSectorDAO {
    private SqlSession sqlSession;

    public UserSectorDAO() {
    }

    public UserSectorDAO(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<UserSectorVO> getUserSector(String id) {
        System.out.println(456);
        List<UserSectorVO> list = null;

        try {
            list = sqlSession.selectList("example.triggerinvestservlet.UserSector.getUserSector", id);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        return list;
    }
}
