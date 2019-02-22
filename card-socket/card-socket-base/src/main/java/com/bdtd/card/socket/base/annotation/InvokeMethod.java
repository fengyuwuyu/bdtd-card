package com.bdtd.card.socket.base.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.socket.base.command.ICommand;

@SuppressWarnings("rawtypes")
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface InvokeMethod {
	public Class<? extends ICommand> request();
	public Class<? extends ICommand> response(); 
}
