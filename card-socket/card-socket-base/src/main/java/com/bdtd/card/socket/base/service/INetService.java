package com.bdtd.card.socket.base.service;

import java.net.InetSocketAddress;

import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.invoke.IInvoke;
import com.bdtd.card.socket.base.promise.BdtdPromise;

import io.netty.util.concurrent.EventExecutor;

public interface INetService {

	default <T> void init(InetSocketAddress address, BdtdPromise<T> promise) {};
	
	default <T> void start(BdtdPromise<T> promise) {};
	
	default <T> void close(BdtdPromise<T> promise) {};
	
	void init(InetSocketAddress address);
	
	void registerServer(IInvoke... servers);
	
	void registerClient(IInvoke... clients);
	
	void start();
	
	void close();
	
	EventExecutor getEventExecutor();
	
	<T, R> void cacheCallback(AbstractCommand<T> command, AsyncCallback<R> callback);
	
	<T, R> void dealResponse(AbstractCommand<T> command);
	
	void startNetty();
}
