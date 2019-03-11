package com.bdtd.card.socket.base.service;

import java.net.InetSocketAddress;

import com.bdtd.card.socket.base.handler.ServerInitializerHandler;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoop;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.ImmediateEventExecutor;

public abstract class AbstractServerNetService extends AbstractNetService {
	private final ChannelGroup channelGroup = new DefaultChannelGroup(ImmediateEventExecutor.INSTANCE);
	private final EventLoopGroup group = new NioEventLoopGroup();
	private final EventLoop eventExecutor = group.next();
	private Channel channel;
	private ServerBootstrap bootstrap;

	@Override
	public void close() {
		if (channel != null) {
			channel.close();
		}
		channelGroup.close();
		group.shutdownGracefully();
	}

	@Override
	public void init(int nodeId, InetSocketAddress address) {
		this.address = address;
		this.nodeId = nodeId;
		bootstrap = new ServerBootstrap();
		bootstrap.group(group).channel(NioServerSocketChannel.class).childHandler(new ServerInitializerHandler(channelGroup, this));
	}

	@Override
	public EventExecutor getEventExecutor() {
		return this.eventExecutor;
	}

	@Override
	public void startNetty() {
		ChannelFuture future = bootstrap.bind(address);
		future.syncUninterruptibly();
		channel = future.channel();
		AbstractServerNetService service = this;
		Runtime.getRuntime().addShutdownHook(new Thread() {
			@Override
			public void run() {
				service.close();
			}
		});
		future.channel().closeFuture().syncUninterruptibly();
	}

	@Override
	public int getNodeId() {
		return this.nodeId;
	}

}
