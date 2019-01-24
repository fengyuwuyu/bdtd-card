package com.bdtd.card.base.service.invoke;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import com.bdtd.card.base.service.annotation.Command;
import com.bdtd.card.base.service.annotation.InvokeClass;
import com.bdtd.card.base.service.annotation.InvokeMethod;
import com.bdtd.card.base.service.callback.DefaultCallback;
import com.bdtd.card.base.service.command.ICommand;
import com.bdtd.card.base.service.context.IContext;
import com.bdtd.card.base.service.model.InvokeMetadata;
import com.bdtd.card.base.service.model.MethodCommand;
import com.bdtd.card.base.service.model.MethodType;
import com.bdtd.card.common.base.model.BdtdError;

public abstract class AbstractInvoke implements IInvoke {

	private InvokeMetadata invokeMetadata;
	private IContext context;

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
				throw new RuntimeException("Command should has Command annotation.");
			}
		}

		return methodCommandList;
	}

	@Override
	public InvokeMetadata getMetadata() {
		return this.invokeMetadata;
	}

	@Override
	public void invoke(ICommand command) {
		this.context.write(command);
	}

	public void sendFail(DefaultCallback defaultCallback, Class<? extends ICommand> responseClass, BdtdError error) {
	}

}
