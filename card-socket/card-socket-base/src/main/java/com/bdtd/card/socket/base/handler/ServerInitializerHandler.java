package com.bdtd.card.socket.base.handler;

import com.bdtd.card.socket.base.handler.DefaultCommandHandler;
import com.bdtd.card.socket.base.marshalling.MarshallingCodeFactory;
import com.bdtd.card.socket.base.service.INetService;

import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.group.ChannelGroup;

public class ServerInitializerHandler extends ChannelInitializer<Channel> {
	@SuppressWarnings("unused")
	private final ChannelGroup group;
	private final INetService netService;

	public ServerInitializerHandler(ChannelGroup group, INetService netService) {
		this.group = group;
		this.netService = netService;
	}

	@Override
	protected void initChannel(Channel ch) throws Exception {
		ChannelPipeline pipeline = ch.pipeline();
		pipeline.addLast(MarshallingCodeFactory.buildDecoder());
		pipeline.addLast(MarshallingCodeFactory.buildEncoder());
		pipeline.addLast(new DefaultCommandHandler(this.netService));
	}
}