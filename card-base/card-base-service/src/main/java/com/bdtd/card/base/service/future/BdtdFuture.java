package com.bdtd.card.base.service.future;

import java.util.concurrent.TimeUnit;

import io.netty.channel.ChannelFuture;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;

public interface BdtdFuture extends Future<Object> {

    @Override
    BdtdFuture addListener(GenericFutureListener<? extends Future<? super Object>> listener);

    @Override
    BdtdFuture addListeners(GenericFutureListener<? extends Future<? super Object>>... listeners);

    @Override
    BdtdFuture removeListener(GenericFutureListener<? extends Future<? super Object>> listener);

    @Override
    BdtdFuture removeListeners(GenericFutureListener<? extends Future<? super Object>>... listeners);

    @Override
    BdtdFuture sync() throws InterruptedException;

    @Override
    BdtdFuture syncUninterruptibly();

    @Override
    BdtdFuture await() throws InterruptedException;

    @Override
    BdtdFuture awaitUninterruptibly();
    
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
}
