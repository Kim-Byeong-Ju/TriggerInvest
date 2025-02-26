package org.example.triggerinvestservlet.dao;

import org.apache.ibatis.session.SqlSession;
import org.example.triggerinvestservlet.vo.UserVO;

import java.util.HashMap;
import java.util.Map;

public class UserDAO {
    private SqlSession sqlSession;

    public UserDAO() {
    }

    public UserDAO(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public UserVO login(String id, String password) {

        UserVO userVO = null;
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        params.put("password", password);

        try {
            userVO = sqlSession.selectOne("example.triggerinvestservlet.User.login", params);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            sqlSession.close();
        }

        return userVO;
    }
}
