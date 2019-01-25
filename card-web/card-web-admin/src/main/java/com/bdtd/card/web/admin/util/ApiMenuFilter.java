package com.bdtd.card.web.admin.util;

import java.util.ArrayList;
import java.util.List;

import com.bdtd.card.common.model.MenuNode;
import com.bdtd.card.common.util.SpringContextHolder;
import com.bdtd.card.common.web.properties.BdtdProperties;
import com.bdtd.card.web.admin.consts.Const;

/**
 * api接口文档显示过滤
 */
public class ApiMenuFilter extends MenuNode {

    public static List<MenuNode> build(List<MenuNode> nodes) {

        //如果关闭了接口文档,则不显示接口文档菜单
        BdtdProperties gunsProperties = SpringContextHolder.getBean(BdtdProperties.class);
        if (!gunsProperties.getSwaggerOpen()) {
            List<MenuNode> menuNodesCopy = new ArrayList<>();
            for (MenuNode menuNode : nodes) {
                if (Const.API_MENU_NAME.equals(menuNode.getName())) {
                    continue;
                } else {
                    menuNodesCopy.add(menuNode);
                }
            }
            nodes = menuNodesCopy;
        }

        return nodes;
    }
}
