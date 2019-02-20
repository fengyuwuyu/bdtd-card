package com.bdtd.card.socket.base.promise;


import java.util.concurrent.TimeUnit;

import com.bdtd.card.socket.base.future.BdtdFuture;

import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;
import io.netty.util.concurrent.Promise;

public interface BdtdPromise<T> extends BdtdFuture<T>, Promise<T> {

	@Override
	BdtdPromise<T> setSuccess(T result);
	
	BdtdPromise<T> setSuccess();
	
	/**
	 * @brief 设置 promise超时，如果promise在指定时间内没有被设置上值，那么promise将setCause(PromiseTimeoutException)
	 * @param timeout
	 * @param timeUnit
	 */
	void setTimeout(long timeout, TimeUnit timeUnit);
	
	boolean trySuccess();
	@Override
	BdtdPromise<T> setFailure(Throwable cause);

	@Override
	BdtdPromise<T> addListener(GenericFutureListener<? extends Future<? super T>> listener);

	@SuppressWarnings("unchecked")
	@Override
	BdtdPromise<T> addListeners(GenericFutureListener<? extends Future<? super T>>... listeners);

	@Override
	BdtdPromise<T> removeListener(GenericFutureListener<? extends Future<? super T>> listener);

	@SuppressWarnings("unchecked")
	@Override
	BdtdPromise<T> removeListeners(GenericFutureListener<? extends Future<? super T>>... listeners);

	@Override
	BdtdPromise<T> sync() throws InterruptedException;

	@Override
	BdtdPromise<T> syncUninterruptibly();

	@Override
	BdtdPromise<T> await() throws InterruptedException;

	@Override
	BdtdPromise<T> awaitUninterruptibly();

}
