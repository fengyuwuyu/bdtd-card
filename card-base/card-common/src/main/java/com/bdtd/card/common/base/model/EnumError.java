package com.bdtd.card.common.base.model;

import java.util.HashMap;
import java.util.Map;

public enum EnumError {

	//system
	DELETE_DICT_CASCADE_ERROR(1001, "改字典存在下级字典，请先清空子字典后再执行此操作", EnumModule.SYSTEM), 
	
	
	// ==========================================代码生成模块==========================================
	FILE_NOT_EXIST(1001, "项目目录不存在", EnumModule.GENERATOR), 
	
	// ==========================================网络模块==========================================
	DUPLICATE_COMMAND_KEY(1001, "重复的command key", EnumModule.NETWORK),
	INVOKE_COMMAND_KEY(1002, "发送command失败", EnumModule.NETWORK),
	COMMAND_CATEGORY_NOT_EXIST(1003, "不存在的CommandCategory", EnumModule.NETWORK),
	SERVER_MODULE_NOT_REGIST(1004, "服务模块未注册", EnumModule.NETWORK),
	INVOKE_METADATA_NOT_REGIST(1005, "服务模块未注册", EnumModule.NETWORK),
	METHOD_COMMAND_NOT_EXIST(1006, "不存在的MethodCommand", EnumModule.NETWORK),

	

	// ==========================================公共模块==========================================
	NO_ERROR(0, "成功", EnumModule.COMMON), 
	UNKNOWN_ERROR(-1, "未知错误", EnumModule.COMMON),
	COMMAND_NOT_FOUND(-2, "未知的Command", EnumModule.COMMON),
	MODULE_NOT_EXIST(-3, "不存在的ModuleId", EnumModule.COMMON),
	
	
	;

	private int code;
	private String message;
	private EnumModule module;

	private EnumError(int code, String message, EnumModule module) {
		this.code = code;
		this.message = message;
		this.module = module;
	}

	public long getCode() {
		return code;
	}

	public String getMessage() {
		return message;
	}

	public EnumModule getModule() {
		return module;
	}
	
	public long getErrorCode() {
		if (this.module != null) {
			return formatErrorCode(this.module.getModuleId(), this.code);
		}
		return 0;
	}

	private long formatErrorCode(int module, int error) {
		return (((long) module) << 32) + (((long) error) & 0x00000000FFFFFFFFL);
	}

	private final static Map<Long, EnumError> ERROR_ENUM_MAP = new HashMap<>();
	
	static {
		for (EnumError error : EnumError.values()) {
			long key = error.getErrorCode();
			EnumError old = ERROR_ENUM_MAP.put(key, error);
			if (old != null) {
				throw new IllegalStateException("重复的Error:" + old.name());
			}
		}
	}
	
	/**
	 * 描述:这个方法是根据错误码获取相应错误枚举
	 *
	 * @param errorCode
	 * @return
	 */
	public static EnumError getError(long errorCode) {

		if (errorCode == 0) {
			return EnumError.NO_ERROR;
		} else if (((int) (errorCode & 0x00000000FFFFFFFFL)) < 0) {
			errorCode &= 0x00000000FFFFFFFFL;
		}

		EnumError error = ERROR_ENUM_MAP.get(errorCode);
		if (error == null) {
			error = EnumError.UNKNOWN_ERROR;
		}
		return error;
	}
}
