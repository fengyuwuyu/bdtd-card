package com.bdtd.card.base.common.web.wrapper;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.EmptyWrapper;

public class MybatisCustomWrapper<T> extends EmptyWrapper<T> {

    /**
     * 
     */
    private static final long serialVersionUID = -7458057490945166994L;

    
    public Wrapper<T> bit(String column, Object params) {
        return bit(true, column, params);
    }
    
    public Wrapper<T> bit(boolean condition, String column, Object params) {
        if (condition) {
//            sql.WHERE(formatSql(String.format("%s & {0} = {0}", column), params));
        }
        return this;
    }
    
    public Wrapper<T> unbit(String column, Object params) {
        return unbit(true, column, params);
    }
    
    public Wrapper<T> unbit(boolean condition, String column, Object params) {
        if (condition) {
//            sql.WHERE(formatSql(String.format("%s & {0} != {0}", column), params));
        }
        return this;
    }
    
    public static void main(String[] args) {
        MybatisCustomWrapper<Object> wrapper = new MybatisCustomWrapper<>();
        wrapper.unbit("handle_type", 8L);
        System.out.println(wrapper.getSqlSegment());
    }
}
