package com.bdtd.card.socket.base.invoke;

import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.model.InvokeMetadata;
import com.bdtd.card.socket.base.promise.BdtdPromise;

public interface IInvoke {

	void initMetadata();
	
	InvokeMetadata getMetadata();
	
	<T, R> void invoke(Class<? extends AbstractCommand<T>> clazz, AsyncCallback<R> callback, T data);
	
	<T, R> void dealRequest(AbstractCommand<T> command, BdtdPromise<R> promise);
	
}
