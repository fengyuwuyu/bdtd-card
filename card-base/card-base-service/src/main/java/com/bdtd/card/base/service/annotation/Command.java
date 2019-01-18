package com.bdtd.card.base.service.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.bdtd.card.base.service.command.ICommand;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.common.base.model.BdtdModule;	

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Command {
	public BdtdModule module();
	public int commandId();
	public CommandCategory category();
	public Class<? extends ICommand> couple() default ICommand.class;
}
