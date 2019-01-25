package com.bdtd.card.service.admin.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bdtd.card.data.admin.dao.DictMapper;
import com.bdtd.card.data.admin.model.Dict;
import com.bdtd.card.service.admin.service.IDictService;

/**
 * <p>
 * 字典表 服务实现类
 * </p>
 */
@Service
public class DictServiceImpl extends ServiceImpl<DictMapper, Dict> implements IDictService {

	@Override
	public List<Map<String, Object>> selectListObtainParentName(Integer pid, String condition) {
		return this.baseMapper.selectListObtainParentName(pid, condition);
	}

}
