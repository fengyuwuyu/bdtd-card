package com.bdtd.card.socket.base.command;

import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.InnerPacketHead;
import com.bdtd.card.socket.base.msg.InnerPacketMsg;

public interface ICommand {

	short getModuleId();
	short getCommandId();
	CommandCategory getCommandCategory();
	
	/**
	 * @return request和response的couple是它们对方，publish的couple是null
	 */
	Class<? extends ICommand> getCouple();
	
	ICommand newCouple();
	InnerPacketHead getHead();
	void setHead(InnerPacketHead innerPacketHead);
	boolean read(InnerPacketMsg innerPacketMsg);
	void write(InnerPacketMsg innerPacketMsg);
	void newHead();
	void setClientRequest(AbstractCommand abstractCommand);
	void setArrivedTimestamp(long currentTimeMillis);
	long getArrivedTimestamp();
	void setClientRequest(ICommand request);
	ICommand getClientRequest();
}
