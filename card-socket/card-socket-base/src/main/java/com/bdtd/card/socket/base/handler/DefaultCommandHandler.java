package com.bdtd.card.socket.base.handler;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.service.INetService;

import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;

public class DefaultCommandHandler extends ChannelInboundHandlerAdapter {
	
	private Logger log = LoggerFactory.getLogger(getClass());
	private INetService netservice;
	
	public DefaultCommandHandler(INetService netservice) {
		super();
		this.netservice = netservice;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		ICommand command = (ICommand) msg;
		log.info("receive message is " + command);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		ctx.writeAndFlush(Unpooled.EMPTY_BUFFER).addListener(ChannelFutureListener.CLOSE);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		log.error("catch channel exception", cause);
		ctx.close();
	}

	@Override
	public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
		log.info(ctx.name() + " is removed");
		ctx.close();
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		log.info("channelActive");
	}

	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		log.info("channelRegistered");
	}

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		log.info("channelUnregistered");
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		log.info("channelInactive");
	}
	
	

	
}
