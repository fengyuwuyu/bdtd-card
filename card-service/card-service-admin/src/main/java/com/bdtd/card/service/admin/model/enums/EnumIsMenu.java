package com.bdtd.card.service.admin.model.enums;

/**
 * 是否是菜单的枚举
 *
 * @author 
 * @date 2017年6月1日22:50:11
 */
public enum EnumIsMenu {

    YES(1, "是"),
    NO(0, "不是");//不是菜单的是按钮

    int code;
    String message;

    EnumIsMenu(int code, String message) {
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
            for (EnumIsMenu s : EnumIsMenu.values()) {
                if (s.getCode() == status) {
                    return s.getMessage();
                }
            }
            return "";
        }
    }
}
