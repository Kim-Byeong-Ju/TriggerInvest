package org.example.triggerinvestservlet.vo;

public class UserSectorVO {
    private String user_id;
    private int sector_id;

    public UserSectorVO() {
    }

    public UserSectorVO(String user_id, int sector_id) {
        this.user_id = user_id;
        this.sector_id = sector_id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getSector_id() {
        return sector_id;
    }

    public void setSector_id(int sector_id) {
        this.sector_id = sector_id;
    }
}
