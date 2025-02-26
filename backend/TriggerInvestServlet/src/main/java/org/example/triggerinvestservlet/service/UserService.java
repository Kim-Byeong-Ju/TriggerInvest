package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import org.example.triggerinvestservlet.dao.UserDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.UserVO;

public class UserService {

    public UserVO login(String id, String password) {
        SqlSessionFactory sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();

        UserDAO userDAO = new UserDAO(sqlSession);

        UserVO result = userDAO.login(id, password);

        return result;
    }

}
