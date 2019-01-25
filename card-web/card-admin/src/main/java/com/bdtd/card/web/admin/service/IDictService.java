package com.bdtd.card.service.admin.service;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.extension.service.IService;
import com.bdtd.card.data.admin.model.Dict;

/**
 * <p>
 * 字典表 服务类
 * </p>
 */
public interface IDictService extends IService<Dict> {

	List<Map<String, Object>> selectListObtainParentName(Integer pid, String condition);

}
