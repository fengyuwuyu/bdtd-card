package com.bdtd.card.base.common.base.model;

import java.util.HashMap;
import java.util.Map;

public enum BdtdModule {
	
	COMMON(1000, "通用模块"),
	SYSTEM(1001, "系统模块"),
	NETWORK(1002, "通信模块"),
	UNDEFINE(-1, "未定义的模块"), 
	
	;

	private int moduleId;
	private String desc;

	private BdtdModule(int moduleId, String desc) {
		this.moduleId = moduleId;
		this.desc = desc;
	}

	public int getModuleId() {
		return moduleId;
	}

	public String getDesc() {
		return desc;
	}

	private final static Map<Integer, BdtdModule> MODULE_ENUM_MAP = new HashMap<>();
	
	static {
		for (BdtdModule module : BdtdModule.values()) {
			BdtdModule old = MODULE_ENUM_MAP.put(module.getModuleId(), module);
			if (old != null) {
				throw new IllegalStateException("重复的Module:" + old.name());
			}
		}
	}
	
	public static BdtdModule getModule(Integer moduleId) {
		return MODULE_ENUM_MAP.get(moduleId);
	}

}
