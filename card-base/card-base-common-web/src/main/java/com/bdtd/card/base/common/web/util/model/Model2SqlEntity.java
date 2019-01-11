package com.bdtd.card.base.common.web.util.model;

import java.util.Arrays;
import java.util.List;

import com.bdtd.card.base.common.model.Operator;

public class Model2SqlEntity {

    private String columnName;
    private List<Object> values;
    private Operator operator;

    public Model2SqlEntity() {
    }


    public Model2SqlEntity(String columnName, Object value) {
        this(columnName, value, Operator.EQ);
    }
    
    public Model2SqlEntity(String columnName, Object value, Operator operator) {
        this(columnName, Arrays.asList(value), operator);
    }
    
    public Model2SqlEntity(String columnName, List<Object> values) {
        this(columnName, values, Operator.EQ);
    }

    public Model2SqlEntity(String columnName, List<Object> values, Operator operator) {
        this.columnName = columnName;
        this.values = values;
        this.operator = operator;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public List<Object> getValues() {
        return values;
    }

    public void setValues(List<Object> values) {
        this.values = values;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    @Override
    public String toString() {
        return "Model2SqlEntity [columnName=" + columnName + ", values=" + values + ", operator=" + operator + "]";
    }

}
