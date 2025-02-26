package org.example.triggerinvestservlet.vo;

import java.sql.Date;

public class TickerHistoryVO {
    private Date historyDate;
    private String tickerId;
    private int openPrice;
    private int closedPrice;
    private int highPrice;
    private int lowPrice;
    private int volume;

    public TickerHistoryVO() {
    }

    public TickerHistoryVO(Date historyDate, String tickerId, int openPrice, int closedPrice, int highPrice, int lowPrice, int volume) {
        this.historyDate = historyDate;
        this.tickerId = tickerId;
        this.openPrice = openPrice;
        this.closedPrice = closedPrice;
        this.highPrice = highPrice;
        this.lowPrice = lowPrice;
        this.volume = volume;
    }

    public Date getHistoryDate() {
        return historyDate;
    }

    public void setHistoryDate(Date historyDate) {
        this.historyDate = historyDate;
    }

    public String getTickerId() {
        return tickerId;
    }

    public void setTickerId(String tickerId) {
        this.tickerId = tickerId;
    }

    public int getOpenPrice() {
        return openPrice;
    }

    public void setOpenPrice(int openPrice) {
        this.openPrice = openPrice;
    }

    public int getClosedPrice() {
        return closedPrice;
    }

    public void setClosedPrice(int closedPrice) {
        this.closedPrice = closedPrice;
    }

    public int getHighPrice() {
        return highPrice;
    }

    public void setHighPrice(int highPrice) {
        this.highPrice = highPrice;
    }

    public int getLowPrice() {
        return lowPrice;
    }

    public void setLowPrice(int lowPrice) {
        this.lowPrice = lowPrice;
    }

    public int getVolume() {
        return volume;
    }

    public void setVolume(int volume) {
        this.volume = volume;
    }
}
