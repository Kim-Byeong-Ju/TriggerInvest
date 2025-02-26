package org.example.triggerinvestservlet.vo;

import java.sql.Date;

public class FinancialVO {
    private String tickerId;
    private Date listingDate;
    private int totalProfit;
    private int netProfit;
    private int netProfitRate;

    public FinancialVO() {
    }

    public FinancialVO(String tickerId, Date listingDate, int totalProfit, int netProfit, int netProfitRate) {
        this.tickerId = tickerId;
        this.listingDate = listingDate;
        this.totalProfit = totalProfit;
        this.netProfit = netProfit;
        this.netProfitRate = netProfitRate;
    }

    public String getTickerId() {
        return tickerId;
    }

    public void setTickerId(String tickerId) {
        this.tickerId = tickerId;
    }

    public Date getListingDate() {
        return listingDate;
    }

    public void setListingDate(Date listingDate) {
        this.listingDate = listingDate;
    }

    public int getTotalProfit() {
        return totalProfit;
    }

    public void setTotalProfit(int totalProfit) {
        this.totalProfit = totalProfit;
    }

    public int getNetProfit() {
        return netProfit;
    }

    public void setNetProfit(int netProfit) {
        this.netProfit = netProfit;
    }

    public int getNetProfitRate() {
        return netProfitRate;
    }

    public void setNetProfitRate(int netProfitRate) {
        this.netProfitRate = netProfitRate;
    }
}
