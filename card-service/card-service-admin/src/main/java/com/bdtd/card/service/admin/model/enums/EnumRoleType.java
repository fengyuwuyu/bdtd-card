package com.bdtd.card.service.admin.model.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public enum EnumRoleType {
    
    GENERAL(1, "普通角色"), ORG_ADMIN(2, "单位管理员"), SUPPER_ADMIN(3, "超级管理员")
    ;  

    private int type;
    private String desc;

    private EnumRoleType(int type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public int getType() {
        return type;
    }

    public String getDesc() {
        return desc;
    }
    
    private static final Map<Integer, EnumRoleType> CACHE = new HashMap<>(EnumRoleType.values().length);
    
    static {
        for(EnumRoleType type : EnumRoleType.values()) {
            CACHE.put(type.getType(), type);
        }
    }
    
    public static EnumRoleType typeOf(Integer type) {
        EnumRoleType roleType = CACHE.get(type);
        return roleType == null ? EnumRoleType.GENERAL : roleType;
    }
    
    public static List<Map<String, Object>> select() {
        List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
        for (EnumRoleType storageType : EnumRoleType.values()) {
            Map<String, Object> map = new TreeMap<>();
            map.put("id", storageType.getType());
            map.put("name", storageType.getDesc());
            result.add(map);
        }
        return result;
    }

}
