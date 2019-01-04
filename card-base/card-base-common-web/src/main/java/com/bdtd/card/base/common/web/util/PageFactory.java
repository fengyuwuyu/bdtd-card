package com.bdtd.card.base.common.web.util;

import javax.servlet.http.HttpServletRequest;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.bdtd.card.base.common.web.model.EnumOrder;

/**
 * BootStrap Table默认的分页参数创建
 *
 * @author 
 * @date 2017-04-05 22:25
 */
public class PageFactory<T> {

    public Page<T> defaultPage() {
        HttpServletRequest request = HttpKit.getRequest();
        int limit = Integer.valueOf(request.getParameter("limit"));     //每页多少条数据
        int offset = Integer.valueOf(request.getParameter("offset"));   //每页的偏移量(本页当前有多少条)
        String sort = request.getParameter("sort");         //排序字段名称
        String order = request.getParameter("order");       //asc或desc(升序或降序)
        if (ToolUtil.isEmpty(sort)) {
            Page<T> page = new Page<>((offset / limit + 1), limit);
            return page;
        } else {
            Page<T> page = new Page<>((offset / limit + 1), limit);
            if (EnumOrder.ASC.getDes().equals(order)) {
                page.setAsc(sort);
            } else {
                page.setDesc(sort);
            }
            return page;
        }
    }
}
