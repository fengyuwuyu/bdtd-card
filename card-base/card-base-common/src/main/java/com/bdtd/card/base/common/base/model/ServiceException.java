package com.bdtd.card.base.common.base.model;

/**
 * 抽象接口
 */
public interface ServiceException {

    /**
     * 获取异常编码
     */
    Integer getCode();

    /**
     * 获取异常信息
     */
    String getMessage();
}
