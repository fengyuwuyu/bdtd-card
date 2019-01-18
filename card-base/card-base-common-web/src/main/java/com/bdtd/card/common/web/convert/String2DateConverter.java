package com.bdtd.card.common.web.convert;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.common.util.StringUtil;

public class String2DateConverter implements Converter<String, Date> {

	@Override
	public Date convert(String source) {
	    if (StringUtil.isNullEmpty(source)) {
	        return null;
	    }
		  
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
        Date date = null;  
        try {  
            date = format.parse(source);  
        } catch (Exception e) {  
            try {
            	format = new SimpleDateFormat("yyyy-MM-dd");  
                date = format.parse(source);  
			} catch (Exception e2) {
				try {
					Long l = Long.valueOf(source);
					date = new Date(l);
				} catch (Exception e3) {
				}
			}
        }  
        return date;  
    
	}  
  
}  