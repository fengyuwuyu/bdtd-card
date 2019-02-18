package com.bdtd.card.socket.base.invoke;

import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.model.InvokeMetadata;

public interface IInvoke {

	void initMetadata();
	
	InvokeMetadata getMetadata();
	
	void invoke(Class<? extends AbstractCommand<Object>> clazz, AsyncCallback<Object> callback, Object data);
}
