package com.bdtd.card.web.admin.wrapper;

import java.util.Map;

import com.bdtd.card.common.web.util.ToolUtil;
import com.bdtd.card.common.web.wrapper.BaseControllerWarpper;
import com.bdtd.card.web.admin.consts.factory.ConstantFactory;

/**
 * 部门列表的包装
 *
 * @author 
 * @date 2017年4月25日 18:10:31
 */
public class DeptWarpper extends BaseControllerWarpper {

    public DeptWarpper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {

        Integer pid = (Integer) map.get("pid");

        if (ToolUtil.isEmpty(pid) || pid.equals(0)) {
            map.put("pName", "--");
        } else {
            map.put("pName", ConstantFactory.me().getDeptName(pid));
        }
    }

}
