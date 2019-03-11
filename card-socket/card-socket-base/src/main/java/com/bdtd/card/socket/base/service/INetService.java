package com.bdtd.card.socket.base.service;

import java.net.InetSocketAddress;

import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.invoke.IInvoke;
import com.bdtd.card.socket.base.promise.BdtdPromise;

import io.netty.channel.ChannelHandlerContext;
import io.netty.util.concurrent.EventExecutor;

public interface INetService {

	default <T> void init(InetSocketAddress address, BdtdPromise<T> promise) {};
	
	default <T> void start(BdtdPromise<T> promise) {};
	
	default <T> void close(BdtdPromise<T> promise) {};
	
	void init(int nodeId, InetSocketAddress address);
	
	void registerServer(IInvoke... servers);
	
	void registerClient(IInvoke... clients);
	
	void start();
	
	void close();
	
	EventExecutor getEventExecutor();
	
	<T, R> void cacheCallback(ICommand<T> command, AsyncCallback<R> callback);
	
	<R> void dealResponse(ICommand<R> command);
	
	void startNetty();
	
	int getNodeId();
	
	<T> void dealCommand(ChannelHandlerContext ctx, ICommand<T> command);
}
