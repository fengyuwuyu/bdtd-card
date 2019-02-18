package com.bdtd.card.socket.base.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.invoke.AbstractInvoke;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface InvokeClass {

	BdtdModule module();
	
	String name();
	
	Class<? extends AbstractInvoke> couple();
}
