package com.bdtd.card.web.admin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.data.admin.dao.OperationLogMapper;
import com.bdtd.card.data.admin.model.OperationLog;
import com.bdtd.card.web.admin.service.IOperationLogService;

/**
 * <p>
 * 操作日志 服务实现类
 * </p>
 */
@Service
public class OperationLogServiceImpl extends ServiceImpl<OperationLogMapper, OperationLog> implements IOperationLogService {

    @Override
    public List<Map<String, Object>> getOperationLogs(Page<OperationLog> page, String beginTime, String endTime, String logName, String s, String[] ascs, String[] descs) {
        return this.baseMapper.getOperationLogs(page, beginTime, endTime, logName, s, ascs, descs);
    }
}
