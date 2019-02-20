package com.bdtd.card.socket.base.invoke;

import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.promise.BdtdPromise;

public abstract class AbstractServerInvoke extends AbstractInvoke {

	@Override
	public <T, R> void invoke(Class<? extends AbstractCommand<T>> clazz, AsyncCallback<R> callback, T data) {
		throw new UnsupportedOperationException("ServerInvoker unsupport invoke method");
	}

	@Override
	public <T, R> void dealRequest(AbstractCommand<T> command, BdtdPromise<R> promise) {
		ICommand response = command.newCouple();
		
	}
	
	
}
