package com.bdtd.card.base.common.web.util;

import com.bdtd.card.base.common.util.SpringContextHolder;
import com.bdtd.card.base.common.web.properties.BdtdProperties;

/**
 * 验证码工具类
 */
public class KaptchaUtil {

    /**
     * 获取验证码开关
     */
    public static Boolean getKaptchaOnOff() {
        return SpringContextHolder.getBean(BdtdProperties.class).getKaptchaOpen();
    }
}