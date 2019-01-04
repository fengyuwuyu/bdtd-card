package com.bdtd.card.base.common.web.model;

/**
 * 数据库排序
 *
 * @author 
 * @Date 2017年5月31日20:48:41
 */
public enum EnumOrder {

    ASC("asc"), DESC("desc");

    private String des;

    EnumOrder(String des) {
        this.des = des;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }
}
