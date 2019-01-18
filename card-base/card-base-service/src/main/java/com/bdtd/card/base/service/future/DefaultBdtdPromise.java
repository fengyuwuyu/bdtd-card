package com.bdtd.card.base.service.future;

import java.util.concurrent.TimeUnit;

import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;

public class DefaultBdtdPromise extends BasePromise<Object> implements BdtdPromise {
	
	public DefaultBdtdPromise(EventExecutor executor) {
		super(executor);
	}
	
	@Override
	public void setTimeout(long timeout, TimeUnit timeUnit) {
		throw new UnsupportedOperationException();
	}
	
	@Override
	public boolean isNull() {
		return false;
	}

	@Override
	public BdtdPromise setSuccess(Object result) {
        super.setSuccess(result);
        return this;
	}

	@Override
	public BdtdPromise setSuccess() {
		return setSuccess(null);
	}

	@Override
	public boolean trySuccess() {
		return trySuccess(null);
	}

	@Override
	public BdtdPromise setFailure(Throwable cause) {
        super.setFailure(cause);
        return this;
	}

	@Override
	public BdtdPromise addListener(GenericFutureListener<? extends Future<? super Object>> listener) {
        super.addListener(listener);
        return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public BdtdPromise addListeners(GenericFutureListener<? extends Future<? super Object>>... listeners) {
        super.addListeners(listeners);
        return this;
	}

	@Override
	public BdtdPromise removeListener(GenericFutureListener<? extends Future<? super Object>> listener) {
        super.removeListener(listener);
        return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public BdtdPromise removeListeners(GenericFutureListener<? extends Future<? super Object>>... listeners) {
        super.removeListeners(listeners);
        return this;
	}

	@Override
	public BdtdPromise sync() throws InterruptedException {
        super.sync();
        return this;
	}

	@Override
	public BdtdPromise syncUninterruptibly() {
        super.syncUninterruptibly();
        return this;
	}

	@Override
	public BdtdPromise await() throws InterruptedException {
        super.await();
        return this;
	}

	@Override
	public BdtdPromise awaitUninterruptibly() {
        super.awaitUninterruptibly();
        return this;
	}
	

}
