package com.bdtd.card.data.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bdtd.card.base.common.model.ZTreeNode;
import com.bdtd.card.data.admin.model.Dept;

/**
 * <p>
 * 部门表 Mapper 接口
 * </p>
 */
public interface DeptMapper extends BaseMapper<Dept> {

    /**
     * 获取ztree的节点列表
     */
    List<ZTreeNode> tree();

    /**
     * 获取所有部门列表
     */
    List<Map<String, Object>> list(@Param("condition") String condition);

}