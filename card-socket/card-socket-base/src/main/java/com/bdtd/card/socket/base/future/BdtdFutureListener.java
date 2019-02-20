package com.bdtd.card.socket.base.future;

import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.GenericFutureListener;

public interface BdtdFutureListener<T extends Future<T>> extends GenericFutureListener<Future<T>> {

}
