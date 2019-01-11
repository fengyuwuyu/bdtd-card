package com.bdtd.card.base.common.base.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.base.common.base.model.BdtdError;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Error {
	
	public BdtdError error();
}
