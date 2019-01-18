package com.bdtd.card.service.admin.wrapper;

import java.util.List;
import java.util.Map;

import com.bdtd.card.common.web.wrapper.BaseControllerWarpper;
import com.bdtd.card.service.admin.consts.factory.ConstantFactory;
import com.bdtd.card.service.admin.model.enums.IsMenu;

/**
 * 菜单列表的包装类
 *
 * @author 
 * @date 2017年2月19日15:07:29
 */
public class MenuWarpper extends BaseControllerWarpper {

    public MenuWarpper(List<Map<String, Object>> list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        map.put("statusName", ConstantFactory.me().getMenuStatusName((Integer) map.get("status")));
        map.put("isMenuName", IsMenu.valueOf((Integer) map.get("ismenu")));
    }

}
