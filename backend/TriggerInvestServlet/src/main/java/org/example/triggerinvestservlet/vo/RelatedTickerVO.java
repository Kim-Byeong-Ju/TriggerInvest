package org.example.triggerinvestservlet.vo;

public class RelatedTickerVO {
    private String tickerId;
    private String tickerName;
    private String industryGroupId;
    private String industryGroupName;

    public RelatedTickerVO() {
    }

    public RelatedTickerVO(String tickerId, String tickerName, String industryGroupId, String industryGroupName) {
        this.tickerId = tickerId;
        this.tickerName = tickerName;
        this.industryGroupId = industryGroupId;
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

    public void setTickerName(String tickerName) {
        this.tickerName = tickerName;
    }

    public String getIndustryGroupId() {
        return industryGroupId;
    }

    public void setIndustryGroupId(String industryGroupId) {
        this.industryGroupId = industryGroupId;
    }

    public String getIndustryGroupName() {
        return industryGroupName;
    }

    public void setIndustryGroupName(String industryGroupName) {
        this.industryGroupName = industryGroupName;
    }
}
