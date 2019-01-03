package com.bdtd.card.base.common.web.config.beetl;

import org.beetl.ext.spring.BeetlGroupUtilConfiguration;

import com.bdtd.card.base.common.web.util.KaptchaUtil;
import com.bdtd.card.base.common.web.util.ToolUtil;

/**
 * beetl拓展配置,绑定一些工具类,方便在模板中直接调用
 *
 * @author stylefeng
 * @Date 2018/2/22 21:03
 */
public class BeetlConfiguration extends BeetlGroupUtilConfiguration {

    @Override
    public void initOther() {
//        groupTemplate.registerFunctionPackage("shiro", new ShiroExt());
        groupTemplate.registerFunctionPackage("tool", new ToolUtil());
        groupTemplate.registerFunctionPackage("kaptcha", new KaptchaUtil());
    }
}
