package com.bdtd.card.service.admin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.data.admin.dao.LoginLogMapper;
import com.bdtd.card.data.admin.model.LoginLog;
import com.bdtd.card.data.admin.model.OperationLog;
import com.bdtd.card.service.admin.service.ILoginLogService;

/**
 * <p>
 * 登录记录 服务实现类
 * </p>
 */
@Service
public class LoginLogServiceImpl extends ServiceImpl<LoginLogMapper, LoginLog> implements ILoginLogService {

    @Override
    public List<Map<String, Object>> getLoginLogs(Page<OperationLog> page, String beginTime, String endTime, String logName, String[] ascs, String[] descs) {
        return this.baseMapper.getLoginLogs(page, beginTime, endTime, logName, ascs, descs);
    }
}
