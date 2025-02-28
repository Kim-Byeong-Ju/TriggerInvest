package org.example.triggerinvestservlet.vo;
import java.util.List;

public class SectorWeightVO {
    private int sectorId;
    private String sectorName;
    private double totalAmount; // ✅ 해당 섹터의 총 소비 금액
    private int transactionCount; // ✅ 해당 섹터에서의 소비 빈도
    private double weightScore; // ✅ 가중치 점수 (계산된 값)
    private List<TickerVO> tickers;

    public SectorWeightVO() {
    }

    public int getSectorId() {
        return sectorId;
    }

    public List<TickerVO> getTickers() {
        return tickers;
    }

    public void setTickers(List<TickerVO> tickers) {
        this.tickers = tickers;
    }

    public void setSectorId(int sectorId) {
        this.sectorId = sectorId;
    }

    public SectorWeightVO(int sectorId, String sectorName, double totalAmount, int transactionCount, double weightScore, List<TickerVO> tickers) {
        this.sectorId = sectorId;
        this.sectorName = sectorName;
        this.totalAmount = totalAmount;
        this.transactionCount = transactionCount;
        this.weightScore = weightScore;
        this.tickers = tickers;
    }

    public String getSectorName() {
        return sectorName;
    }

    public void setSectorName(String sectorName) {
        this.sectorName = sectorName;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getTransactionCount() {
        return transactionCount;
    }

    public void setTransactionCount(int transactionCount) {
        this.transactionCount = transactionCount;
    }

    public double getWeightScore() {
        return weightScore;
    }

    public void setWeightScore(double weightScore) {
        this.weightScore = weightScore;
    }
}
