package com.bdtd.card.web.admin.wrapper;

import java.util.List;
import java.util.Map;

import com.bdtd.card.common.web.util.ToolUtil;
import com.bdtd.card.common.web.wrapper.BaseControllerWarpper;
import com.bdtd.card.data.admin.model.Dict;
import com.bdtd.card.web.admin.consts.factory.ConstantFactory;

/**
 * 字典列表的包装
 */
public class DictWarpper extends BaseControllerWarpper {

    public DictWarpper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        StringBuffer detail = new StringBuffer();
        Integer id = (Integer) map.get("id");
        List<Dict> dicts = ConstantFactory.me().findInDict(id);
        if(dicts != null){
            for (Dict dict : dicts) {
                detail.append(dict.getId() + ":" +dict.getName() + ",");
            }
            map.put("detail", ToolUtil.removeSuffix(detail.toString(),","));
        }
    }

}
