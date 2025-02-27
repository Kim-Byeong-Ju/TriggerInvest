package org.example.triggerinvestservlet.vo;

public class SectorWeightVO {
    private int sectorId;
    private String sectorName;
    private double totalAmount; // ✅ 해당 섹터의 총 소비 금액
    private int transactionCount; // ✅ 해당 섹터에서의 소비 빈도
    private double weightScore; // ✅ 가중치 점수 (계산된 값)

    public SectorWeightVO() {
    }

    public int getSectorId() {
        return sectorId;
    }

    public void setSectorId(int sectorId) {
        this.sectorId = sectorId;
    }

    public SectorWeightVO(int sectorId, String sectorName, double totalAmount, int transactionCount, double weightScore) {
        this.sectorId = sectorId;
        this.sectorName = sectorName;
        this.totalAmount = totalAmount;
        this.transactionCount = transactionCount;
        this.weightScore = weightScore;
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
