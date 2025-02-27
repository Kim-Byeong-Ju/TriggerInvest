package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.triggerinvestservlet.service.RelatedTickerService;
import org.example.triggerinvestservlet.vo.RelatedTickerVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(value = "/related")
public class RelatedTickerController extends HttpServlet {
    public RelatedTickerController() {}

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String stockCode = req.getParameter("stockCode");

        RelatedTickerService relatedTickerService = new RelatedTickerService();
        List<RelatedTickerVO> relatedTickerList = relatedTickerService.getRelatedTickersByStockCode(stockCode);

        System.out.println(relatedTickerList);

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").setPrettyPrinting().create();
        String jsonResponse = gson.toJson(relatedTickerList);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
