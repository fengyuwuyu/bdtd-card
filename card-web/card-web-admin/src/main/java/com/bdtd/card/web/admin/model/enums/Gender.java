package com.bdtd.card.web.admin.model.enums;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public enum Gender {

    MALE(1, "男"),
    FEMALE(2, "女");
    
    private long type;
    private String desc;

    private Gender(long type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public long getType() {
        return type;
    }

    public String getDesc() {
        return desc;
    }
    
    public static List<Map<String, Object>> select() {
        List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
        for (Gender mask : Gender.values()) {
            Map<String, Object> map = new TreeMap<>();
            map.put("id", mask.getType());
            map.put("name", mask.getDesc());
            result.add(map);
        }
        return result;
    }
}
