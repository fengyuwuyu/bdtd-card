package com.bdtd.card.common.web.model;

import java.util.function.Function;

import com.bdtd.card.common.web.annotation.EnumEntity;

public class EnumAdapterEntity {

    private String fieldName;
    private String enumName;
    private Function<Object, Object> adapterFunc;

    public EnumAdapterEntity() {
    }
    
    public EnumAdapterEntity(EnumEntity entity) {
    	this.fieldName = entity.fieldName();
    	this.enumName = entity.enumName();
    }

    public EnumAdapterEntity(String fieldName, String enumName) {
        this.fieldName = fieldName;
        this.enumName = enumName;
    }

    public EnumAdapterEntity(String fieldName, String enumName, Function<Object, Object> adapterFunc) {
        this.fieldName = fieldName;
        this.enumName = enumName;
        this.adapterFunc = adapterFunc;
    }

    public Function<Object, Object> getAdapterFunc() {
        return adapterFunc;
    }

    public void setAdapterFunc(Function<Object, Object> adapterFunc) {
        this.adapterFunc = adapterFunc;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public String getEnumName() {
        return enumName;
    }

    public void setEnumName(String enumName) {
        this.enumName = enumName;
    }

    @Override
    public String toString() {
        return "EnumAdapterEntity [fieldName=" + fieldName + ", enumName=" + enumName + "]";
    }

}
