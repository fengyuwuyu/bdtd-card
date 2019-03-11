package com.bdtd.card.socket.base.service;

import java.net.InetSocketAddress;

import io.netty.util.concurrent.EventExecutor;

public abstract class AbstractClientNetService extends AbstractNetService {

	@Override
	public void init(int nodeId, InetSocketAddress address) {
		
	}

	@Override
	public void close() {
		// TODO Auto-generated method stub

	}

	@Override
	public EventExecutor getEventExecutor() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void startNetty() {
		// TODO Auto-generated method stub

	}

	@Override
	public int getNodeId() {
		// TODO Auto-generated method stub
		return 0;
	}

}
