package com.bdtd.card.service.admin.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.data.admin.dao.RelationMapper;
import com.bdtd.card.data.admin.model.Relation;
import com.bdtd.card.service.admin.service.IRelationService;

/**
 * <p>
 * 角色和菜单关联表 服务实现类
 * </p>
 */
@Service
public class RelationServiceImpl extends ServiceImpl<RelationMapper, Relation> implements IRelationService {

}
