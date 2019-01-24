package com.bdtd.card.common.web.annotation;

public @interface DictEntity {

	int parentId();
	String fieldName();
	String replaceFieldName() default "";
}
