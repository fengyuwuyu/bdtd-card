package com.bdtd.card.socket.base.promise;

import java.util.concurrent.TimeUnit;

import com.bdtd.card.common.base.model.BdtdError;

import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;

public class DefaultBdtdPromise<T> extends BasePromise<T> implements BdtdPromise<T> {
	
	private BdtdError error;
	
	public DefaultBdtdPromise() {
		super();
	}

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
	public BdtdPromise<T> setSuccess(T result) {
        super.setSuccess(result);
        return this;
	}

	@Override
	public BdtdPromise<T> setSuccess() {
		return setSuccess(null);
	}

	@Override
	public boolean trySuccess() {
		return trySuccess(null);
	}

	@Override
	public BdtdPromise<T> setFailure(Throwable cause) {
        super.setFailure(cause);
        return this;
	}

	@Override
	public BdtdPromise<T> addListener(GenericFutureListener<? extends Future<? super T>> listener) {
        super.addListener(listener);
        return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public BdtdPromise<T> addListeners(GenericFutureListener<? extends Future<? super T>>... listeners) {
        super.addListeners(listeners);
        return this;
	}

	@Override
	public BdtdPromise<T> removeListener(GenericFutureListener<? extends Future<? super T>> listener) {
        super.removeListener(listener);
        return this;
	}

	@SuppressWarnings("unchecked")
	@Override
	public BdtdPromise<T> removeListeners(GenericFutureListener<? extends Future<? super T>>... listeners) {
        super.removeListeners(listeners);
        return this;
	}

	@Override
	public BdtdPromise<T> sync() throws InterruptedException {
        super.sync();
        return this;
	}

	@Override
	public BdtdPromise<T> syncUninterruptibly() {
        super.syncUninterruptibly();
        return this;
	}

	@Override
	public BdtdPromise<T> await() throws InterruptedException {
        super.await();
        return this;
	}

	@Override
	public BdtdPromise<T> awaitUninterruptibly() {
        super.awaitUninterruptibly();
        return this;
	}

	@Override
	public void tryError(BdtdError error) {
		this.error = error;
	}

	@Override
	public BdtdError getError() {
		return this.error;
	}
	

}
