package com.bdtd.card.web.admin.model.enums;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public enum RoleType {
    
    GENERAL(1, "普通角色"), ORG_ADMIN(2, "单位管理员"), SUPPER_ADMIN(3, "超级管理员")
    ;  

    private int type;
    private String desc;

    private RoleType(int type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public int getType() {
        return type;
    }

    public String getDesc() {
        return desc;
    }
    
    private static final Map<Integer, RoleType> CACHE = new HashMap<>(RoleType.values().length);
    
    static {
        for(RoleType type : RoleType.values()) {
            CACHE.put(type.getType(), type);
        }
    }
    
    public static RoleType typeOf(Integer type) {
        RoleType roleType = CACHE.get(type);
        return roleType == null ? RoleType.GENERAL : roleType;
    }
    
    public static List<Map<String, Object>> select() {
        List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
        for (RoleType storageType : RoleType.values()) {
            Map<String, Object> map = new TreeMap<>();
            map.put("id", storageType.getType());
            map.put("name", storageType.getDesc());
            result.add(map);
        }
        return result;
    }

}
