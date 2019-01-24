package com.bdtd.card.base.service.context;

import com.bdtd.card.base.service.command.ICommand;

import io.netty.channel.Channel;
import io.netty.util.concurrent.Future;

public interface IContext {

	Future<Object> getFuture();
	
	Channel getChannel();
	
	void read(ICommand command);
	
	void write(ICommand command);
}
