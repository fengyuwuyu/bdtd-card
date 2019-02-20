package com.bdtd.card.socket.base.service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.exception.NetUnknowException;
import com.bdtd.card.socket.base.invoke.IInvoke;
import com.bdtd.card.socket.base.model.InvokeMetadata;

@SuppressWarnings({ "unchecked", "rawtypes" })
public abstract class AbstractNetService implements INetService {
	
	private Map<BdtdModule, InvokeMetadata> invokeMap = new HashMap<>();
	private ConcurrentHashMap<String, AsyncCallback> callbackMap = new ConcurrentHashMap<>();
	private ConcurrentHashMap<BdtdModule, IInvoke> clientInvokeMap = new ConcurrentHashMap<>();
	private ConcurrentHashMap<BdtdModule, IInvoke> serverInvokeMap = new ConcurrentHashMap<>();

	@Override
	public void registerServer(IInvoke... servers) {
		registerInvoke(serverInvokeMap, servers);
		registerInvokeMetadata(servers);
	}

	private void registerInvokeMetadata(IInvoke[] servers) {
		for (IInvoke server : servers) {
			BdtdModule key = server.getMetadata().getModule();
			if (invokeMap.put(key, server.getMetadata()) != null) {
				throw new IllegalArgumentException(String.format("InvokeMetadata[%s]被重复注册", server.getMetadata().getName()));
			}
		}
	}

	@Override
	public void registerClient(IInvoke... clients) {
		registerInvoke(clientInvokeMap, clients);
	}
	
	private void registerInvoke(ConcurrentHashMap<BdtdModule, IInvoke> map, IInvoke... invokes) {
		for (IInvoke invoke : invokes) {
			BdtdModule key = invoke.getMetadata().getModule();
			if (serverInvokeMap.put(key, invoke) != null) {
				throw new IllegalArgumentException(String.format("Invoke[%s]被重复注册", invoke.getMetadata().getName()));
			}
		}
	}
	
	private AsyncCallback getAsyncCallback(ICommand command) {
		return callbackMap.get(command.getCommandKey());
	}

	@Override
	public <T, R> void cacheCallback(AbstractCommand<T> command, AsyncCallback<R> callback) {
		if (callback == null) {
			return ;
		}
		String key = command.getCommandKey();
		AsyncCallback<R> old = callbackMap.putIfAbsent(key, callback);
		if (old != null) {
			throw new NetUnknowException(BdtdError.DUPLICATE_COMMAND_KEY);
		}
	}

	@Override
	public <T, R> void dealResponse(AbstractCommand<T> command) {
		AsyncCallback<T> callback = getAsyncCallback(command);
		if (callback != null) {
			callback.complete(command.getData(), null);
		}
	}

	@Override
	public void start() {
		if (!checkRegistInvoke()) {
			throw new RuntimeException("请注册客户端或服务器端");
		}
		
		this.startNetty();
	}

	private boolean checkRegistInvoke() {
		return serverInvokeMap.size() == 0 && clientInvokeMap.size() == 0;
	}
	
	

}
