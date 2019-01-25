package com.bdtd.card.web.admin.cache;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.bdtd.card.data.admin.dao.DictMapper;
import com.bdtd.card.data.admin.model.Dict;
import com.bdtd.card.web.admin.consts.DictConsts;
import com.bdtd.card.web.admin.model.enums.DictWrapperEntity;

@Component
public class DictCacheFactory {
	
	private static final String KEY = "key";

	private Map<Integer, Map<Integer, Map<String, Object>>> dictMap = new HashMap<>();
	private Map<Integer, List<Map<String, Object>>> dictMapList = new HashMap<>();
	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private DictMapper dictMapper;
	
	public void init() {
		dictMap.clear();
		dictMapList.clear();
		List<Map<String, Object>> dictList = dictMapper.selectDictMapList();
		if (dictList == null || dictList.size() == 0) {
			return;
		}
		dictList.forEach((item) -> {
			Integer key = (Integer)item.get(KEY);
			Map<Integer, Map<String, Object>> map = dictMap.get(key);
			List<Map<String, Object>> list = dictMapList.get(key);
			if (map == null) {
				map = new TreeMap<>();
				dictMap.put(key, map);
			}
			
			if (list == null) {
			    list = new ArrayList<>();
			    dictMapList.put(key, list);
			}
			list.add(item);
			map.put((Integer) item.get("id"), item);
		});
	}
	
	public Map<Integer, Map<Integer, Map<String, Object>>> getDictMap() {
		return dictMap;
	}
	
	public void wrapper(List<Map<String, Object>> rows, List<DictWrapperEntity> dictwrapperEntities) {
		for (Map<String, Object> map : rows) {
			for (DictWrapperEntity entity : dictwrapperEntities) {
			    Integer v = null;
				try {
				    v = (Integer)map.get(entity.getFieldName());
                } catch (Exception e) {
                    log.warn(e.getMessage());
                    log.warn("类型转换失败，entity = " + entity);
                }
				if (v != null) {
				    Object value = null;
				    try {
				        value = getDictMapByParentNameAndNum(entity.getParentId(), v).get(DictConsts.DICT_NAME);
                    } catch (Exception e) {
                        log.warn(e.getMessage());
                    }
				    if (value != null) {
				        map.put(entity.getReplaceFieldName(), value);
				    }
				}
			}
		}
	}
	
	/**
	 * 根据parentName和num获取dict对象
	 * @param parentName
	 * @param id
	 * @return
	 */
	public Map<String, Object> getDictMapByParentNameAndNum(Integer pid, Integer id) {
		return dictMap.get(pid).get(id);
	}
	
	public List<Dict> getDictListByParentId(Integer parentId) {
		if(dictMapList.get(parentId) == null|| dictMapList.get(parentId).size() == 0) {
			return Collections.emptyList();
		}
		return dictMapList.get(parentId).stream().map((item) -> {
			return revertByMap(item);
		}).collect(Collectors.toList());
	}
	
	private Dict revertByMap(Map<String, Object> dictMap) {
		Integer id = (Integer) dictMap.get("id");
		Integer pid = (Integer) dictMap.get("pid");
		String name = (String) dictMap.get("name");
		String enName = (String) dictMap.get("enName");
		String content = (String) dictMap.get("content");
		return new Dict(id, pid, name, enName, content);
	}
	
}
