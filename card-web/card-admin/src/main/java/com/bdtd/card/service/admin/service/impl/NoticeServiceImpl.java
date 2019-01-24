package com.bdtd.card.service.admin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.data.admin.dao.NoticeMapper;
import com.bdtd.card.data.admin.model.Notice;
import com.bdtd.card.service.admin.service.INoticeService;

/**
 * <p>
 * 通知表 服务实现类
 * </p>
 */
@Service
public class NoticeServiceImpl extends ServiceImpl<NoticeMapper, Notice> implements INoticeService {

    @Override
    public List<Map<String, Object>> list(String condition) {
        return this.baseMapper.list(condition);
    }
}
