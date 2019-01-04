package com.bdtd.card.service.admin.model.enums;

/**
 * 菜单的状态
 *
 * @author 
 * @Date 2017年1月22日 下午12:14:59
 */
public enum EnumMenuStatus {

    ENABLE(1, "启用"),
    DISABLE(0, "禁用");

    int code;
    String message;

    EnumMenuStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public static String valueOf(Integer status) {
        if (status == null) {
            return "";
        } else {
            for (EnumMenuStatus s : EnumMenuStatus.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
