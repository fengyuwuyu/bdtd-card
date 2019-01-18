package com.bdtd.card.base.service.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.base.service.command.ICommand;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface InvokeMethod {
	public Class<? extends ICommand> request();
	public Class<? extends ICommand> response(); 
}
