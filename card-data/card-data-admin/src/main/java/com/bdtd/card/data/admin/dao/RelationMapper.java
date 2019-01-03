package com.bdtd.card.data.admin.dao;

import java.util.Map;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bdtd.card.data.admin.model.Relation;

/**
 * <p>
  * 角色和菜单关联表 Mapper 接口
 * </p>
 */
public interface RelationMapper extends BaseMapper<Relation> {

    int insertList(Map<String, Object> createMap);

}