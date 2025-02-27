package org.example.triggerinvestservlet.controller;

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
        List<String> titleList = service.selectTitle(userId);
        List<TickerVO> tickerList = service.selectAllTicker();
        // 리스트를 ','로 구분된 문자열로 변환
        String responseData = String.join(",", titleList);
        resp.setContentType("text/plain");  // JSON이 아니라 일반 텍스트로 설정
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(responseData);
    }
}
