package com.bdtd.card.base.common.base.model;

public enum EnumBdtdError {

	//medical_inventory
	DELETE_MEDICAL_INVENTORY_CASCADE_ERROR(1, "该药品下还存在二级药品，请删除二级药品后再执行此操作", EnumBdtdModule.MEDICAL_INVENTORY),
	DELETE_NOT_EXIST_ERROR(2, "该药品不存在", EnumBdtdModule.MEDICAL_INVENTORY),
	DUPLICATE_PRODUCE_BATCH_NUM_ERROR(3, "重复的生产批号", EnumBdtdModule.MEDICAL_INVENTORY),
	
	//system
	DELETE_DICT_CASCADE_ERROR(1, "改字典存在下级字典，请先清空子字典后再执行此操作", EnumBdtdModule.SYSTEM),
	
	
	;

	private int code;
	private String message;
	private EnumBdtdModule module;

	private EnumBdtdError(int code, String message, EnumBdtdModule module) {
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

	public EnumBdtdModule getModule() {
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
	
	public static void main(String[] args) {
		System.out.println(DELETE_MEDICAL_INVENTORY_CASCADE_ERROR.toString());
	}
}
