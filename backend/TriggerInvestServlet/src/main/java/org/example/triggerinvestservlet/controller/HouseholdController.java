package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.example.triggerinvestservlet.service.HouseholdService;
import org.example.triggerinvestservlet.vo.HouseholdVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.lang.Integer;
@WebServlet(value = "/household")
public class HouseholdController extends HttpServlet {
    public HouseholdController() {}

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        String userId =req.getParameter("userId");
        HouseholdService service = new HouseholdService();
        List<HouseholdVO> list = service.selectHouseholdByUserId(userId);
        // JSON 문자열 생성
        Gson gson = new Gson();
        String jsonResponse = gson.toJson(list);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
   }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");

        // JSON 파싱
        BufferedReader reader = req.getReader();
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(reader, JsonObject.class);

        // JSON 데이터 추출
        String userId = jsonObject.get("userId").getAsString();
        String title = jsonObject.get("title").getAsString();
        int amount = jsonObject.get("amount").getAsInt();
        int sectorId = jsonObject.get("sectorId").getAsInt();
        String transactionDateStr = jsonObject.get("transactionDate").getAsString();

        Date transactionDate = null;
        if (transactionDateStr != null && !transactionDateStr.isEmpty()) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                transactionDate = sdf.parse(transactionDateStr);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        // 서비스 호출
        HouseholdService service = new HouseholdService();
        service.insertHousehold(new HouseholdVO(0, title, userId, amount, sectorId, transactionDate));

        // 데이터 조회
        List<HouseholdVO> list = service.selectHouseholdByUserId(userId);

        // JSON 응답 생성
        String jsonResponse = gson.toJson(list);

        // 응답 설정
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}