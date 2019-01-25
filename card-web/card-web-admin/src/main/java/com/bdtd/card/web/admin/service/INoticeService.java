package com.bdtd.card.web.admin.service;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bdtd.card.data.admin.model.Notice;

/**
 * <p>
 * 通知表 服务类
 * </p>
 */
public interface INoticeService extends IService<Notice> {

    /**
     * 获取通知列表
     */
    List<Map<String, Object>> list(String condition);
}
