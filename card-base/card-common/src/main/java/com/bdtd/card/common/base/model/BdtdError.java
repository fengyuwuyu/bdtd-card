package com.bdtd.card.common.base.model;

import java.util.HashMap;
import java.util.Map;

public enum BdtdError {

	//system
	DELETE_DICT_CASCADE_ERROR(1, "改字典存在下级字典，请先清空子字典后再执行此操作", BdtdModule.SYSTEM), 
	
	
	// ==========================================代码生成模块==========================================
	FILE_NOT_EXIST(1, "项目目录不存在", BdtdModule.GENERATOR), 
	
	
	
	NO_ERROR(0, "成功", BdtdModule.COMMON), 
	UNKNOWN_ERROR(-1, "未知错误", BdtdModule.COMMON),
	COMMAND_NOT_FOUND(-2, "未知的Command", BdtdModule.COMMON),
	
	
	;

	private int code;
	private String message;
	private BdtdModule module;

	private BdtdError(int code, String message, BdtdModule module) {
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

	public BdtdModule getModule() {
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

	private final static Map<Long, BdtdError> ERROR_ENUM_MAP = new HashMap<>();
	
	static {
		for (BdtdError error : BdtdError.values()) {
			long key = error.getErrorCode();
			BdtdError old = ERROR_ENUM_MAP.put(key, error);
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
	public static BdtdError getError(long errorCode) {

		if (errorCode == 0) {
			return BdtdError.NO_ERROR;
		} else if (((int) (errorCode & 0x00000000FFFFFFFFL)) < 0) {
			errorCode &= 0x00000000FFFFFFFFL;
		}

		BdtdError error = ERROR_ENUM_MAP.get(errorCode);
		if (error == null) {
			error = BdtdError.UNKNOWN_ERROR;
		}
		return error;
	}
}
