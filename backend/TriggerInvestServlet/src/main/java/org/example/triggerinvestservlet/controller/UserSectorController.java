package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.triggerinvestservlet.service.UserSectorService;
import org.example.triggerinvestservlet.vo.UserSectorVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(value = "/users/sectors") // ✅ 엔드포인트 변경
public class UserSectorController extends HttpServlet {
    private final UserSectorService userSectorService = new UserSectorService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {


        // 🔹 userId를 쿼리 파라미터로 받음
        String userId = req.getParameter("userId");

        System.out.println(userId);
        if (userId == null || userId.trim().isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing or invalid userId parameter");
            return;
        }

        List<UserSectorVO> userSector = userSectorService.getUserSector(userId);

        if (userSector == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "User sector not found");
            return;
        }

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").setPrettyPrinting().create();
        String jsonResponse = gson.toJson(userSector);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
