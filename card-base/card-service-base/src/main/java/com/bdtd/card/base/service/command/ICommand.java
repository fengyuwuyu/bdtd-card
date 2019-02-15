package com.bdtd.card.base.service.command;

import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.base.service.msg.PacketHead;

public interface ICommand {

	int getModuleId();
	int getCommandId();
	CommandCategory getCommandCategory();
	
	boolean isRequest();
	
	/**
	 * @return request和response的couple是它们对方，publish的couple是null
	 */
	Class<? extends ICommand> getCouple();
	
	ICommand newCouple();
	PacketHead getHead();
	void setHead(PacketHead innerPacketHead);
	void newHead();
	void setClientRequest(AbstractCommand abstractCommand);
	void setTimestamp(long currentTimeMillis);
	long getTimestamp();
	void setClientRequest(ICommand request);
	ICommand getClientRequest();
}
