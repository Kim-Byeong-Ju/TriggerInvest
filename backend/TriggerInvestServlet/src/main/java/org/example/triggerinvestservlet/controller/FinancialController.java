package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.triggerinvestservlet.service.FinancialService;
import org.example.triggerinvestservlet.vo.FinancialVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(value = "/info")
public class FinancialController extends HttpServlet {
    public FinancialController() {}

    @Override
    public void init() throws ServletException {
        super.init();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String stockCode = req.getParameter("stockCode");

        FinancialService financialService = new FinancialService();
        FinancialVO info = financialService.getInfoByStockCode(stockCode);

        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").setPrettyPrinting().create();
        String jsonResponse = gson.toJson(info);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
