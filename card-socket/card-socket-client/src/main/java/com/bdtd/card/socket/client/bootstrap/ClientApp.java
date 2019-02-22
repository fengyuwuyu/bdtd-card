package com.bdtd.card.socket.client.bootstrap;

import java.net.InetSocketAddress;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.bdtd.card.socket.base.service.AbstractNetService;

import io.netty.util.concurrent.EventExecutor;

@SpringBootApplication
public class ClientApp extends AbstractNetService {
	
	
	
	@Override
	public void init(int nodeId, InetSocketAddress address) {
		this.nodeId = nodeId;
		this.address = address;
	}

	@Override
	public void close() {
		
	}

	@Override
	public EventExecutor getEventExecutor() {
		return null;
	}

	@Override
	public void startNetty() {
		
	}

	@Override
	public int getNodeId() {
		return this.nodeId;
	}

	
}
