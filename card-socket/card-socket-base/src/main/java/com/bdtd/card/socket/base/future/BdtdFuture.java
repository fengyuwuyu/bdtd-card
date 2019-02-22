package com.bdtd.card.socket.base.future;

import java.util.concurrent.TimeUnit;

import com.bdtd.card.common.base.model.BdtdError;

import io.netty.channel.ChannelFuture;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;

@SuppressWarnings("unchecked")
public interface BdtdFuture<T> extends Future<T> {

    @Override
    BdtdFuture<T> addListener(GenericFutureListener<? extends Future<? super T>> listener);

	@Override
    BdtdFuture<T> addListeners(GenericFutureListener<? extends Future<? super T>>... listeners);

    @Override
    BdtdFuture<T> removeListener(GenericFutureListener<? extends Future<? super T>> listener);

    @Override
    BdtdFuture<T> removeListeners(GenericFutureListener<? extends Future<? super T>>... listeners);

    @Override
    BdtdFuture<T> sync() throws InterruptedException;

    @Override
    BdtdFuture<T> syncUninterruptibly();

    @Override
    BdtdFuture<T> await() throws InterruptedException;

    @Override
    BdtdFuture<T> awaitUninterruptibly();
    
    EventExecutor executor();

    /**
     * Returns {@code true} if this {@link ChannelFuture} is a void future and so not allow to call any of the
     * following methods:
     * <ul>
     *     <li>{@link #addListener(GenericFutureListener)}</li>
     *     <li>{@link #addListeners(GenericFutureListener[])}</li>
     *     <li>{@link #await()}</li>
     *     <li>{@link #await(long, TimeUnit)} ()}</li>
     *     <li>{@link #await(long)} ()}</li>
     *     <li>{@link #awaitUninterruptibly()}</li>
     *     <li>{@link #sync()}</li>
     *     <li>{@link #syncUninterruptibly()}</li>
     * </ul>
     */
    boolean isNull();
    
    void tryError(BdtdError error);
    
    BdtdError getError();
}
