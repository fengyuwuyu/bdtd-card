package com.bdtd.card.service.admin.model.enums;

/**
 * 管理员的状态
 */
public enum EnumManagerStatus {

    OK(1, "启用"), FREEZED(2, "冻结"), DELETED(3, "被删除");

    int code;
    String message;

    EnumManagerStatus(int code, String message) {
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

    public static String valueOf(Integer value) {
        if (value == null) {
            return "";
        } else {
            for (EnumManagerStatus ms : EnumManagerStatus.values()) {
                if (ms.getCode() == value) {
                    return ms.getMessage();
                }
            }
            return "";
        }
    }
}
