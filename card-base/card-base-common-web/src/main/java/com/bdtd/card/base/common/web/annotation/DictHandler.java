package com.bdtd.card.base.common.web.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 
 * @author lilei
 *	统一处理Dict
 *
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface DictHandler {

	int[] dictModels() default {};
	
	String[] dictKeys() default {};
	
	DictEntity[] dictWrappers() default {};
}
