package org.example.triggerinvestservlet.vo;

public class TransactionVO {
    private int transaction_id;
    private String user_id;
    private int amount;
    private String memo;
    private String category;
    private String transaction_date;

    public TransactionVO() {
    }

    public TransactionVO(int transaction_id, String user_id, int amount, String memo, String category, String transaction_date) {
        this.transaction_id = transaction_id;
        this.user_id = user_id;
        this.amount = amount;
        this.memo = memo;
        this.category = category;
        this.transaction_date = transaction_date;
    }

    public int getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTransaction_date() {
        return transaction_date;
    }

    public void setTransaction_date(String transaction_date) {
        this.transaction_date = transaction_date;
    }
}
