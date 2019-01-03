package com.bdtd.card.service.admin.service.impl;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.base.common.model.ZTreeNode;
import com.bdtd.card.base.common.util.Convert;
import com.bdtd.card.base.common.util.MapUtil;
import com.bdtd.card.data.admin.dao.RelationMapper;
import com.bdtd.card.data.admin.dao.RoleMapper;
import com.bdtd.card.data.admin.model.Role;
import com.bdtd.card.service.admin.service.IRoleService;

@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private RelationMapper relationMapper;

    @Override
    @Transactional(readOnly = false)
    public void setAuthority(Integer roleId, String ids) {

        // 删除该角色所有的权限
        this.roleMapper.deleteRolesById(roleId);

        List<Long> menuIdList = Arrays.asList(Convert.toLongArray(true, Convert.toStrArray(",", ids)));
        if (menuIdList != null && menuIdList.size() > 0) {
            // 添加新的权限
            this.relationMapper.insertList(MapUtil.createMap("roleId", roleId, "menuIds", menuIdList));
        }
    }

    @Override
    @Transactional(readOnly = false)
    public void delRoleById(Integer roleId) {
        //删除角色
        this.roleMapper.deleteById(roleId);

        // 删除该角色所有的权限
        this.roleMapper.deleteRolesById(roleId);
    }

    @Override
    public List<Map<String, Object>> selectRoles(String condition) {
        return this.baseMapper.selectRoles(condition);
    }

    @Override
    public int deleteRolesById(Integer roleId) {
        return this.baseMapper.deleteRolesById(roleId);
    }

    @Override
    public List<ZTreeNode> roleTreeList() {
        return this.baseMapper.roleTreeList();
    }

    @Override
    public List<ZTreeNode> roleTreeListByRoleId(String[] roleId) {
        return this.baseMapper.roleTreeListByRoleId(roleId);
    }

    @Override
    public Integer findRoleType(Map<String, Object> params) {
        return this.baseMapper.findRoleType(params);
    }

}
