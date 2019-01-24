package com.bdtd.card.common.web.convert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.common.util.StringUtil;

public class String2LongArrayConverter implements Converter<String, Long[]> {
	
	private Logger log = LoggerFactory.getLogger(getClass());

	@Override
	public Long[] convert(String source) {
		if (!StringUtil.isNullEmpty(source)) {
			source = source.replace("[", "");
			source = source.replace("]", "");
			source = source.replace("\"", "");
			String[] arr = source.split(",");
			List<Long> list = new ArrayList<>(arr.length);
			for (String str : arr) {
				if (!StringUtil.isNullEmpty(str)) {
					try {
						list.add(Long.parseLong(str));
					} catch (Exception e) {
						log.warn(String.format("非法的参数， args = [%s].", str));
					}
				}
			}
			Long[] result = new Long[list.size()];
			return list.toArray(result);
		}
		return null;
	}

}
