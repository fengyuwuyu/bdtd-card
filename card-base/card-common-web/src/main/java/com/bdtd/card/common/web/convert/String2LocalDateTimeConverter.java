package com.bdtd.card.common.web.convert;

import java.time.LocalDateTime;

import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.common.util.StringUtil;

public class String2LocalDateTimeConverter implements Converter<String, LocalDateTime> {

	@Override
	public LocalDateTime convert(String source) {
	    if (StringUtil.isNullEmpty(source)) {
	        return null;
	    }
		  
        String[] arr = source.split(" ");
        if (arr.length != 2) {
        	return null;
        }
        
        String[] date = arr[0].split("-");
        if (date.length != 3) {
        	return null;
        }
        String[] time = arr[1].split(":");
        if (time.length != 3) {
        	return null;
        }
        
        int year = Integer.valueOf(date[0]);
		int month = Integer.valueOf(date[1]);
		int dayOfMonth = Integer.valueOf(date[2]);
		int hour = Integer.valueOf(time[0]);
		int minute = Integer.valueOf(time[1]);
		int second = 0;
		try {
			second = Integer.valueOf(time[2]);
		} catch (Exception e) {
			second = Integer.valueOf(time[2].split("\\.")[0]);
		}
		return LocalDateTime.of(year, month, dayOfMonth, hour, minute, second);  
    
	}  
	
	
  
}  