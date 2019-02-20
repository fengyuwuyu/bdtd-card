package com.bdtd.card.socket.base.invoke;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.promise.BdtdPromise;
import com.bdtd.card.socket.base.utils.SequenceIdUtil;

public abstract class AbstractClientInvoke extends AbstractInvoke {

	@Override
	public <T, R> void invoke(Class<? extends AbstractCommand<T>> clazz, AsyncCallback<R> callback, T data) {
		AbstractCommand<T> command = null;
		try {
			command = clazz.newInstance();
			command.setData(data);
			command.getHead().setSequenceId(SequenceIdUtil.generatorId(command.getModuleId(), command.getCommandId()));
			this.context.write(command);
			netService.cacheCallback(command, callback);
		} catch (InstantiationException | IllegalAccessException e) {
			log.error("invoke fail", e);
			if (callback != null) {
				callback.complete(null, BdtdError.INVOKE_COMMAND_KEY);
			}
		}
	}

	@Override
	public <T, R> void dealRequest(AbstractCommand<T> command, BdtdPromise<R> promise) {
		throw new UnsupportedOperationException("ServerInvoker unsupport dealRequest method");
	}
}
