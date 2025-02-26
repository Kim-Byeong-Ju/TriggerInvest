package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.triggerinvestservlet.service.TickerHistoryService;
import org.example.triggerinvestservlet.vo.TickerHistoryVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(value = "/price")
public class TickerHistoryController extends HttpServlet {
    public TickerHistoryController() {}

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String stockCode = req.getParameter("stockCode");

        TickerHistoryService tickerHistoryService = new TickerHistoryService();
        List<TickerHistoryVO> tickerHistoryList = tickerHistoryService.getHistoriesByStockCode(stockCode);

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").setPrettyPrinting().create();
        String jsonResponse = gson.toJson(tickerHistoryList);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
