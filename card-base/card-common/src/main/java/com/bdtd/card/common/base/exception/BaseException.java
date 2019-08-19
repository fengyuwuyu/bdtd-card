package com.bdtd.card.common.base.exception;

import com.bdtd.card.common.base.model.ServiceException;

/**
 * 封装全局异常
 */
public class BaseException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5216158362782197769L;

	private Integer code;

    private String message;

    public BaseException(ServiceException serviceExceptionEnum) {
        this.code = serviceExceptionEnum.getCode();
        this.message = serviceExceptionEnum.getMessage();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
