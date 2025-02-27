package org.example.triggerinvestservlet.vo;

public class TickerVO {
    private String tickerId;
    private String tickerName;
    private String description;
    private String industryGroupName;

    public TickerVO(String tickerId, String name, String description, String industryGroupName) {
        this.tickerId = tickerId;
        this.tickerName = name;
        this.description = description;
        this.industryGroupName = industryGroupName;
    }

    public String getIndustryGroupName() {
        return industryGroupName;
    }

    public void setIndustryGroupName(String industryGroupName) {
        this.industryGroupName = industryGroupName;
    }

    public String getTickerId() {
        return tickerId;
    }

    public void setTickerId(String tickerId) {
        this.tickerId = tickerId;
    }

    public String getTickerName() {
        return tickerName;
    }

    public void setTickerName(String name) {
        this.tickerName = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
