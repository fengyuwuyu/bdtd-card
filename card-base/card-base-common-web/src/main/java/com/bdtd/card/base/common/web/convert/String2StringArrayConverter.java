package com.bdtd.card.base.common.web.convert;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;

import com.bdtd.card.base.common.util.StringUtil;

public class String2StringArrayConverter implements Converter<String, String[]> {

	@Override
	public String[] convert(String source) {
		if (!StringUtil.isNullEmpty(source)) {
			source = source.replace("[", "");
			source = source.replace("]", "");
			source = source.replace("\"", "");
			String[] arr = source.split(",");
			List<String> list = new ArrayList<>(arr.length);
			for (String str : arr) {
				if (!StringUtil.isNullEmpty(str)) {
					list.add(str);
				}
			}
			String[] result = new String[list.size()];
			return list.toArray(result);
		}
		return null;
	}

}
