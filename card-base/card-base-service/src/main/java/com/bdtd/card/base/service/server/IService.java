package com.bdtd.card.base.service.server;

import java.net.SocketAddress;

import com.bdtd.card.base.service.future.BdtdPromise;
import com.bdtd.card.base.service.invoke.IInvoke;

public interface IService {

	void registry(IInvoke invoke);
	
	default void registry(IInvoke... iInvokes) {
		if (iInvokes == null || iInvokes.length == 0) {
			throw new IllegalArgumentException("iInvokes should not be null or empty");
		}
		for (IInvoke invoke : iInvokes) {
			registry(invoke);
		}
	};
	
	void init(SocketAddress address);
	
	default void init(SocketAddress address, BdtdPromise promise) {};
	
	void start();
	
	default void start(BdtdPromise promise) {};
}
