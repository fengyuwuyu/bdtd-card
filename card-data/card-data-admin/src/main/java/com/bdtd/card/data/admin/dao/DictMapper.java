package com.bdtd.card.data.admin.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.bdtd.card.data.admin.model.Dict;

/**
 * <p>
 * 字典表 Mapper 接口
 * </p>
 */
public interface DictMapper extends BaseMapper<Dict> {

	List<Map<String, Object>> selectDictMapList();

	List<Map<String, Object>> selectListObtainParentName(@Param("pid") Integer pid, @Param("name") String name);
}
