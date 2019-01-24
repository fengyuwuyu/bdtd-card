package com.bdtd.card.service.admin.service;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bdtd.card.data.admin.model.LoginLog;
import com.bdtd.card.data.admin.model.OperationLog;

/**
 * <p>
 * 登录记录 服务类
 * </p>
 */
public interface ILoginLogService extends IService<LoginLog> {

    /**
     * 获取登录日志列表
     */
    List<Map<String, Object>> getLoginLogs(Page<OperationLog> page, String beginTime, String endTime, String logName, String[] ascs, String[] descs);
}
