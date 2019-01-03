package com.bdtd.card.base.common.web.annotation;

public @interface DictEntity {

	int parentId();
	String fieldName();
	String replaceFieldName() default "";
}
