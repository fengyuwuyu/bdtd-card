package com.bdtd.card.common.web.convert;

import java.time.LocalDate;

import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.common.util.StringUtil;

public class String2LocalDateConverter implements Converter<String, LocalDate> {

	@Override
	public LocalDate convert(String source) {
	    if (StringUtil.isNullEmpty(source)) {
	        return null;
	    }
		  
        String[] arr = source.split("-");
        if (arr.length != 3) {
        	return null;
        }
        
        int year = Integer.valueOf(arr[0]);
		int month = Integer.valueOf(arr[1]);
		int dayOfMonth = Integer.valueOf(arr[2]);
		return LocalDate.of(year, month, dayOfMonth);  
    
	}  
  
}  