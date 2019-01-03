package com.bdtd.card.data.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bdtd.card.data.admin.model.Notice;

/**
 * <p>
 * 通知表 Mapper 接口
 * </p>
 */
public interface NoticeMapper extends BaseMapper<Notice> {

    /**
     * 获取通知列表
     */
    List<Map<String, Object>> list(@Param("condition") String condition);

}