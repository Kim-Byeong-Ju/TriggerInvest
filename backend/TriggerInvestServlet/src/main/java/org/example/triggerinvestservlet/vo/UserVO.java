package org.example.triggerinvestservlet.vo;

public class UserVO {
    private String user_id;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String birthdate;

    public UserVO() {
    }

    public UserVO(String user_id, String password, String name, String email, String phone, String birthdate) {
        this.user_id = user_id;
        this.password = password;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthdate = birthdate;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
}
