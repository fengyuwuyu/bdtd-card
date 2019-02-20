package com.bdtd.card.socket.base.utils;

import com.bdtd.card.socket.base.future.BdtdFuture;
import com.bdtd.card.socket.base.promise.BdtdPromise;
import com.bdtd.card.socket.base.promise.DefaultBdtdPromise;

import io.netty.util.concurrent.DefaultEventExecutor;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.GenericFutureListener;

public class NetworkUtil {

	public static <T> BdtdPromise<T> defaultBdtdPromise(GenericFutureListener<BdtdFuture<T>> listener) {
		BdtdPromise<T> promise = new DefaultBdtdPromise<>(defaultEventExecutor());
		promise.addListener(listener);
		return promise;
	}
	
	public static EventExecutor defaultEventExecutor() {
		return new DefaultEventExecutor();
	}
}
