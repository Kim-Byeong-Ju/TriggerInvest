package org.example.triggerinvestservlet.service;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import org.example.triggerinvestservlet.dao.UserDAO;
import org.example.triggerinvestservlet.dao.UserSectorDAO;
import org.example.triggerinvestservlet.mybatis.MyBatisSessionFactory;
import org.example.triggerinvestservlet.vo.UserSectorVO;
import org.example.triggerinvestservlet.vo.UserVO;

import java.util.List;

public class UserSectorService {

    public List<UserSectorVO> getUserSector(String id) {
        System.out.println(123);
        SqlSessionFactory sqlSessionFactory = MyBatisSessionFactory.getSqlSessionFactory();
        SqlSession sqlSession = sqlSessionFactory.openSession();

        UserSectorDAO userSectorDAO = new UserSectorDAO(sqlSession);

        List<UserSectorVO> result = userSectorDAO.getUserSector(id);

        return result;
    }

}
