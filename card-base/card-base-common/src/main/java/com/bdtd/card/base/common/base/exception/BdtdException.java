package com.bdtd.card.base.common.base.exception;

import com.bdtd.card.base.common.base.model.ServiceException;

/**
 * 封装全局异常
 */
public class BdtdException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5216158362782197769L;

	private Integer code;

    private String message;

    public BdtdException(ServiceException serviceExceptionEnum) {
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
