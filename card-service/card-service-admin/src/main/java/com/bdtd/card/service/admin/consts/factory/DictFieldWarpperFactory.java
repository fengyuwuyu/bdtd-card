package com.bdtd.card.service.admin.consts.factory;

import java.lang.reflect.Method;

import com.bdtd.card.common.base.exception.BdtdException;
import com.bdtd.card.common.base.model.BizException;

/**
 * 字典字段的包装器(从ConstantFactory中获取包装值)
 *
 * @author 
 * @date 2017-05-06 15:12
 */
public class DictFieldWarpperFactory {

    public static Object createFieldWarpper(Object parameter, String methodName) {
        IConstantFactory constantFactory = ConstantFactory.me();
        try {
            Method method = IConstantFactory.class.getMethod(methodName, parameter.getClass());
            return method.invoke(constantFactory, parameter);
        } catch (Exception e) {
            try {
                Method method = IConstantFactory.class.getMethod(methodName, Integer.class);
                return method.invoke(constantFactory, Integer.parseInt(parameter.toString()));
            } catch (Exception e1) {
                throw new BdtdException(BizException.ERROR_WRAPPER_FIELD);
            }
        }
    }

}
