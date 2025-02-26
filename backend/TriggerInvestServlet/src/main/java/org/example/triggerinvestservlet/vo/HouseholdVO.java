package org.example.triggerinvestservlet.vo;

import java.util.Date;

public class HouseholdVO {
    private int householdId;
    private String title;
    private String userId;
    private int amount;
    private int sectorId;
    private Date TransactionDate;

    public HouseholdVO() {}
    public HouseholdVO(int householdId, String title, String userId, int amount, int sectorId, Date TransactionDate) {
        this.householdId = householdId;
        this.title = title;
        this.userId = userId;
        this.amount = amount;
        this.sectorId = sectorId;
        this.TransactionDate = TransactionDate;
    }

    public int getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(int householdId) {
        this.householdId = householdId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getSectorId() {
        return sectorId;
    }

    public void setSectorId(int sectorId) {
        this.sectorId = sectorId;
    }

    public Date getTransactionDate() {
        return TransactionDate;
    }

    public void setTransactionDate(Date transactionDate) {
        TransactionDate = transactionDate;
    }
}
