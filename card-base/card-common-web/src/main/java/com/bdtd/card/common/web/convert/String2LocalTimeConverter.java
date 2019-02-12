package com.bdtd.card.common.web.convert;

import java.time.LocalTime;

import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.common.util.StringUtil;

public class String2LocalTimeConverter implements Converter<String, LocalTime> {

	@Override
	public LocalTime convert(String source) {
	    if (StringUtil.isNullEmpty(source)) {
	        return null;
	    }
		  
        String[] time = source.split(":");
        if (time.length != 3) {
        	return null;
        }
        
		int hour = Integer.valueOf(time[0]);
		int minute = Integer.valueOf(time[1]);
		int second = 0;
		try {
			second = Integer.valueOf(time[2]);
		} catch (Exception e) {
			second = Integer.valueOf(time[2].split("\\.")[0]);
		}
		return LocalTime.of(hour, minute, second);  
    
	}  
	
	
  
}  