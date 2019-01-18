package com.bdtd.card.service.admin.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bdtd.card.common.model.ZTreeNode;
import com.bdtd.card.data.admin.model.Role;

/**
 * 角色相关业务
 */
public interface IRoleService extends IService<Role> {

    /**
     * 设置某个角色的权限
     *
     * @param roleId 角色id
     * @param ids    权限的id
     */
    void setAuthority(Integer roleId, String ids);

    /**
     * 删除角色
     */
    void delRoleById(Integer roleId);

    /**
     * 根据条件查询角色列表
     */
    List<Map<String, Object>> selectRoles(@Param("condition") String condition);

    /**
     * 删除某个角色的所有权限
     *
     * @param roleId 角色id
     * @return
     */
    int deleteRolesById(@Param("roleId") Integer roleId);

    /**
     * 获取角色列表树
     *
     * @return
     */
    List<ZTreeNode> roleTreeList();

    /**
     * 获取角色列表树
     *
     * @return
     */
    List<ZTreeNode> roleTreeListByRoleId(String[] roleId);

    Integer findRoleType(Map<String, Object> createMap);
}
