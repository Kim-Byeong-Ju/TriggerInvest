package org.example.triggerinvestservlet.mybatis;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.Reader;

public class MyBatisSessionFactory {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            String resource = "./SqlMapConfig.xml";
            Reader reader = Resources.getResourceAsReader(resource);

            if (sqlSessionFactory == null) {
                sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static SqlSessionFactory getSqlSessionFactory() {
        return sqlSessionFactory;
    }
}
