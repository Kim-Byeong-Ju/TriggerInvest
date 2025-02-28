package org.example.triggerinvestservlet.controller;

import org.example.triggerinvestservlet.service.UserService;
import org.example.triggerinvestservlet.vo.UserVO;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/login")
public class LoginController extends HttpServlet {
    private UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String userId = request.getParameter("id");
        String password = request.getParameter("password");

        // JSON 응답을 반환하기 위해 Content-Type 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        // DB에서 사용자 검증
        UserVO user = userService.login(userId, password);

        if (user != null) {
            // 로그인 성공 시, 세션에 user_id 저장
            HttpSession session = request.getSession();
            session.setAttribute("user_id", userId);

            // JSON 응답 (로그인 성공)
            out.print("{\"status\": \"success\", " +
                    "\"message\": \"로그인 성공\", " +
                    "\"userId\": \"" + userId + "\", " +
                    "\"userName\": \"" + user.getName() + "\"}");}
            else {
            // JSON 응답 (로그인 실패)
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // HTTP 401 상태 코드 반환
            out.print("{\"status\": \"fail\", \"message\": \"아이디 또는 비밀번호가 잘못되었습니다.\"}");
        }
        out.flush();
    }
}
