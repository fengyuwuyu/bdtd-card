package com.bdtd.card.service.admin.wrapper;

import java.util.List;
import java.util.Map;

import com.bdtd.card.base.common.web.wrapper.BaseControllerWarpper;
import com.bdtd.card.service.admin.consts.factory.ConstantFactory;

/**
 * 角色列表的包装类
 */
public class RoleWarpper extends BaseControllerWarpper {

    public RoleWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("pName", ConstantFactory.me().getSingleRoleName((Integer) map.get("pid")));
        map.put("deptName", ConstantFactory.me().getDeptName((Integer) map.get("deptid")));
    }

}
