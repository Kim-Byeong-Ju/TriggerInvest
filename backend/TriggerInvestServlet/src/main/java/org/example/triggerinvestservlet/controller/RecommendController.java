package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import org.example.triggerinvestservlet.service.HouseholdService;
import org.example.triggerinvestservlet.service.RecommendService;
import org.example.triggerinvestservlet.vo.TickerVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(value = "/recommend")
public class RecommendController extends HttpServlet {
    public RecommendController() {}

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String userId =req.getParameter("userId");
        RecommendService service = new RecommendService();
        List<TickerVO> list = service.recommendTicker(userId);
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(list);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
