package com.bdtd.card.socket.base.future;


import java.util.concurrent.TimeUnit;

import com.bdtd.card.base.service.future.BdtdFuture;

import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;
import io.netty.util.concurrent.Promise;

public interface BdtdPromise extends BdtdFuture, Promise<Object> {

	@Override
	BdtdPromise setSuccess(Object result);
	
	BdtdPromise setSuccess();
	
	/**
	 * @brief 设置 promise超时，如果promise在指定时间内没有被设置上值，那么promise将setCause(PromiseTimeoutException)
	 * @param timeout
	 * @param timeUnit
	 */
	void setTimeout(long timeout, TimeUnit timeUnit);
	
	boolean trySuccess();
	@Override
	BdtdPromise setFailure(Throwable cause);

	@Override
	BdtdPromise addListener(GenericFutureListener<? extends Future<? super Object>> listener);

	@SuppressWarnings("unchecked")
	@Override
	BdtdPromise addListeners(GenericFutureListener<? extends Future<? super Object>>... listeners);

	@Override
	BdtdPromise removeListener(GenericFutureListener<? extends Future<? super Object>> listener);

	@SuppressWarnings("unchecked")
	@Override
	BdtdPromise removeListeners(GenericFutureListener<? extends Future<? super Object>>... listeners);

	@Override
	BdtdPromise sync() throws InterruptedException;

	@Override
	BdtdPromise syncUninterruptibly();

	@Override
	BdtdPromise await() throws InterruptedException;

	@Override
	BdtdPromise awaitUninterruptibly();

}
