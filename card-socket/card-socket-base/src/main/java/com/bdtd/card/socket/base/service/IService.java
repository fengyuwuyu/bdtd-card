package com.bdtd.card.socket.base.service;

import java.net.InetSocketAddress;

import com.bdtd.card.socket.base.future.BdtdPromise;

import io.netty.util.concurrent.EventExecutor;

public interface IService {

	default void init(InetSocketAddress address, BdtdPromise promise) {};
	
	default void start(BdtdPromise promise) {};
	
	default void close(BdtdPromise promise) {};
	
	void init(InetSocketAddress address);
	
	void start();
	
	void close();
	
	EventExecutor getEventExecutor();
}
