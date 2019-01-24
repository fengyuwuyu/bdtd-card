package com.bdtd.card.socket.server.handler;

import com.bdtd.card.socket.base.marshalling.MarshallingCodeFactory;

import io.netty.channel.Channel;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.group.ChannelGroup;

public class ServerInitializerHandler extends ChannelInitializer<Channel> {
	@SuppressWarnings("unused")
	private final ChannelGroup group;

	public ServerInitializerHandler(ChannelGroup group) {
		this.group = group;
	}

	@Override
	protected void initChannel(Channel ch) throws Exception {
		ChannelPipeline pipeline = ch.pipeline();
		pipeline.addLast(MarshallingCodeFactory.buildDecoder());
		pipeline.addLast(MarshallingCodeFactory.buildEncoder());
	}
}