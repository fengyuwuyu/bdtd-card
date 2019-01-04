package com.bdtd.card.service.admin.log;

import java.util.Date;

import com.bdtd.card.data.admin.model.LoginLog;
import com.bdtd.card.data.admin.model.OperationLog;
import com.bdtd.card.service.admin.model.enums.EnumLogSucceed;
import com.bdtd.card.service.admin.model.enums.EnumLogType;

/**
 * 日志对象创建工厂
 *
 * @author 
 * @date 2016年12月6日 下午9:18:27
 */
public class LogFactory {

    /**
     * 创建操作日志
     */
    public static OperationLog createOperationLog(EnumLogType logType, Integer userId, String bussinessName, String clazzName, String methodName, String msg, EnumLogSucceed succeed) {
        OperationLog operationLog = new OperationLog();
        operationLog.setLogtype(logType.getMessage());
        operationLog.setLogname(bussinessName);
        operationLog.setUserid(userId);
        operationLog.setClassname(clazzName);
        operationLog.setMethod(methodName);
        operationLog.setCreatetime(new Date());
        operationLog.setSucceed(succeed.getMessage());
        operationLog.setMessage(msg);
        return operationLog;
    }

    /**
     * 创建登录日志
     */
    public static LoginLog createLoginLog(EnumLogType logType, Integer userId, String msg, String ip) {
        LoginLog loginLog = new LoginLog();
        loginLog.setLogname(logType.getMessage());
        loginLog.setUserid(userId);
        loginLog.setCreatetime(new Date());
        loginLog.setSucceed(EnumLogSucceed.SUCCESS.getMessage());
        loginLog.setIp(ip);
        loginLog.setMessage(msg);
        return loginLog;
    }
}
