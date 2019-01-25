package com.bdtd.card.web.admin.model.enums;

import com.bdtd.card.common.util.StringUtil;
import com.bdtd.card.common.web.annotation.DictEntity;

public class DictWrapperEntity {

	private Integer parentId;
	private String fieldName;
	private String replaceFieldName;

	public DictWrapperEntity() {
		super();
	}
	public DictWrapperEntity(DictEntity dictEntity) {
		super();
		this.parentId = dictEntity.parentId();
		this.fieldName = dictEntity.fieldName();
		this.replaceFieldName = StringUtil.isNullEmpty(dictEntity.replaceFieldName()) ? dictEntity.fieldName() : dictEntity.replaceFieldName();
	}
	
	public DictWrapperEntity(Integer parentId, String fieldName) {
        this.parentId = parentId;
        this.fieldName = fieldName;
        this.replaceFieldName = fieldName;
    }
    public DictWrapperEntity(Integer parentId, String fieldName, String replaceFieldName) {
		super();
		this.parentId = parentId;
		this.fieldName = fieldName;
		this.replaceFieldName = replaceFieldName;
	}
	
	

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	public String getReplaceFieldName() {
		return replaceFieldName;
	}

	public void setReplaceFieldName(String replaceFieldName) {
		this.replaceFieldName = replaceFieldName;
	}

	@Override
	public String toString() {
		return "DictWrapperEntity [parentId=" + parentId + ", fieldName=" + fieldName + ", replaceFieldName="
				+ replaceFieldName + "]";
	}

}
