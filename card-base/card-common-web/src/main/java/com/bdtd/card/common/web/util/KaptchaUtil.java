package com.bdtd.card.common.web.util;

import com.bdtd.card.common.util.SpringContextHolder;
import com.bdtd.card.common.web.properties.BdtdProperties;

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