package com.bdtd.card.base.common.web.convert;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.base.common.util.StringUtil;

public class String2IntegerArrayConverter implements Converter<String, Integer[]> {

	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Override
	public Integer[] convert(String source) {
		if (!StringUtil.isNullEmpty(source)) {
			source = source.replace("[", "");
			source = source.replace("]", "");
			source = source.replace("\"", "");
			String[] arr = source.split(",");
			List<Integer> list = new ArrayList<>(arr.length);
			for (String str : arr) {
				if (!StringUtil.isNullEmpty(str)) {
					try {
						list.add(Integer.parseInt(str));
					} catch (Exception e) {
						log.warn(String.format("非法的参数， args = [%s].", str));
					}
				}
			}
			Integer[] result = new Integer[list.size()];
			return list.toArray(result);
		}
		return null;
	}

}
