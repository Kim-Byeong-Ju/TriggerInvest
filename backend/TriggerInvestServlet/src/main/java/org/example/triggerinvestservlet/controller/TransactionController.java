package org.example.triggerinvestservlet.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.example.triggerinvestservlet.service.TransactionService;
import org.example.triggerinvestservlet.vo.SectorWeightVO;
import org.example.triggerinvestservlet.vo.TickerVO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(value = "/users/transactions/sector-weights") // ✅ 엔드포인트 설정
public class TransactionController extends HttpServlet {
    private final TransactionService transactionService = new TransactionService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String userId = req.getParameter("userId");

        if (userId == null || userId.trim().isEmpty()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing or invalid userId parameter");
            return;
        }

        // ✅ 1. 사용자별 섹터 가중치 리스트 조회
        List<SectorWeightVO> sectorWeights = transactionService.calculateSectorWeights(userId);

        System.out.println("happy");
        System.out.println(sectorWeights);


        // ✅ 2. 각 섹터 ID별로 ticker 리스트를 조회 후 매핑
        for (SectorWeightVO sectorWeight : sectorWeights) {
            List<TickerVO> tickerList = transactionService.getSectorTickers(sectorWeight.getSectorId());
            sectorWeight.setTickers(tickerList); // ✅ 해당 섹터에 매핑된 ticker 리스트 설정
        }

        // ✅ 3. JSON 응답 생성
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").setPrettyPrinting().create();
        String jsonResponse = gson.toJson(sectorWeights);

        // ✅ 4. 응답 설정 및 전송
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(jsonResponse);
    }
}
