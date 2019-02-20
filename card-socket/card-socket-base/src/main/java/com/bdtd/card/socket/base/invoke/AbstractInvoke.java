package com.bdtd.card.socket.base.invoke;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.socket.base.annotation.Command;
import com.bdtd.card.socket.base.annotation.InvokeClass;
import com.bdtd.card.socket.base.annotation.InvokeMethod;
import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.context.INetContext;
import com.bdtd.card.socket.base.model.InvokeMetadata;
import com.bdtd.card.socket.base.model.MethodCommand;
import com.bdtd.card.socket.base.model.MethodType;
import com.bdtd.card.socket.base.service.INetService;
import com.bdtd.card.socket.base.utils.SequenceIdUtil;

public abstract class AbstractInvoke implements IInvoke {

	protected Logger log = LoggerFactory.getLogger(getClass());

	protected InvokeMetadata invokeMetadata;
	protected INetContext context;
	protected INetService netService;

	public AbstractInvoke() {
		this.initMetadata();
	}

	@Override
	public void initMetadata() {
		InvokeClass invokeClass = this.getClass().getDeclaredAnnotation(InvokeClass.class);
		if (invokeClass == null) {
			throw new RuntimeException("this class should has InvokeClass annotation.");
		}

		this.invokeMetadata = new InvokeMetadata();
		this.invokeMetadata.setCouple(invokeClass.couple());
		this.invokeMetadata.setInvokerClass(this.getClass());
		this.invokeMetadata.setModule(invokeClass.module());
		this.invokeMetadata.setName(invokeClass.name());

		Method[] methods = this.getClass().getMethods();
		this.invokeMetadata.setMethodCommandList(parseMethods(methods));
	}

	private List<MethodCommand> parseMethods(Method[] methods) {
		List<MethodCommand> methodCommandList = new ArrayList<>(methods.length);
		for (Method method : methods) {
			InvokeMethod invokeMethod = method.getDeclaredAnnotation(InvokeMethod.class);
			if (invokeMethod != null) {
				invokeMethod.request();
				Class<? extends ICommand> command = invokeMethod.request();
				Command c = command.getDeclaredAnnotation(Command.class);
				if (c != null) {
					int commandId = c.commandId();
					MethodType type = MethodType.INVOKE;
					MethodCommand methodCommand = new MethodCommand(method, command, commandId, type);
					methodCommandList.add(methodCommand);
				}
			} else {
				throw new RuntimeException("Command should has @Command annotation.");
			}
		}
		return methodCommandList;
	}

	@Override
	public InvokeMetadata getMetadata() {
		return this.invokeMetadata;
	}

}
