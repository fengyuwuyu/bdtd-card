package com.bdtd.card.socket.base.model;

import java.lang.reflect.Method;

import com.bdtd.card.socket.base.command.ICommand;

public class MethodCommand {

	private Method method;
	private Class<? extends ICommand> command;
	private int commandId;
	private MethodType type;

	public MethodCommand() {
		super();
	}

	public MethodCommand(Method method, Class<? extends ICommand> command, int commandId, MethodType type) {
		super();
		this.method = method;
		this.command = command;
		this.commandId = commandId;
		this.type = type;
	}

	public boolean isPublish() {
		return this.type == MethodType.PUBLISH;
	}

	public Method getMethod() {
		return method;
	}

	public MethodType getMethodType() {
		return this.type;
	}

	public void setMethod(Method method) {
		this.method = method;
	}

	public int getCommandId() {
		return commandId;
	}

	public void setCommandId(int commandId) {
		this.commandId = commandId;
	}

	public Class<? extends ICommand> getCommand() {
		return command;
	}

	public void setCommand(Class<? extends ICommand> command) {
		this.command = command;
	}

	public MethodType getType() {
		return type;
	}

	public void setType(MethodType type) {
		this.type = type;
	}

}
