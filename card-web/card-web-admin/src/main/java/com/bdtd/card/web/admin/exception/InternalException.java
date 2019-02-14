package com.bdtd.card.web.admin.exception;

import com.bdtd.card.web.admin.model.ServiceExceptionEnum;

/**
 * 封装guns的异常
 *
 * @author
 * @Date 2017/12/28 下午10:32
 */
public class InternalException extends RuntimeException {

  private static final long serialVersionUID = 9088404039310862484L;

  private Integer code;

  private String message;

  public InternalException(ServiceExceptionEnum serviceExceptionEnum) {
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
