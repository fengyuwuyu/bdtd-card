package com.bdtd.card.socket.base.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.model.CommandCategory;	

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Command {
	public BdtdModule module();
	public int commandId();
	public CommandCategory category();
	public Class<? extends ICommand> couple() default ICommand.class;
}
