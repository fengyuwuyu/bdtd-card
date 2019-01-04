package com.bdtd.card.service.admin.wrapper;

import java.util.Map;

import com.bdtd.card.base.common.web.wrapper.BaseControllerWarpper;
import com.bdtd.card.service.admin.consts.factory.ConstantFactory;

/**
 * 部门列表的包装
 */
public class NoticeWrapper extends BaseControllerWarpper {

    public NoticeWrapper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        Integer creater = (Integer) map.get("creater");
        map.put("createrName", ConstantFactory.me().getUserNameById(creater));
    }

}
