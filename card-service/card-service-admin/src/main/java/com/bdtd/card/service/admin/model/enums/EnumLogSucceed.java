package com.bdtd.card.service.admin.model.enums;

/**
 * 业务是否成功的日志记录
 */
public enum EnumLogSucceed {

    SUCCESS("成功"),
    FAIL("失败");

    String message;

    EnumLogSucceed(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
