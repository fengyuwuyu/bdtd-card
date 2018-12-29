package com.bdtd.card.data.consume.dao;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bdtd.card.data.consume.model.User;

public interface UserMapper extends BaseMapper<User> {

    /**
     * 修改用户状态
     */
    int setStatus(@Param("userId") Integer userId, @Param("status") int status);

    /**
     * 修改密码
     */
    int changePwd(@Param("userId") Integer userId, @Param("pwd") String pwd);

    /**
     * 设置用户的角色
     */
    int setRoles(@Param("userId") Integer userId, @Param("roleIds") String roleIds);

    /**
     * 通过账号获取用户
     */
    User getByAccount(@Param("account") String account);
}