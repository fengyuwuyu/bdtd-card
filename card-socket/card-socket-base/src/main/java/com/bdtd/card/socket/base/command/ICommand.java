package com.bdtd.card.socket.base.command;

import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.PacketHead;

public interface ICommand {

	int getModuleId();
	int getCommandId();
	int getSequenceId();
	default String getCommandKey() {
		return String.format("%d-%d-%d", getModuleId(), getCommandId(), getSequenceId());
	}
	CommandCategory getCommandCategory();
	
	boolean isRequest();
	
	boolean isResponse();
	
	boolean isPublish();
	
	/**
	 * @return request和response的couple是它们对方，publish的couple是null
	 */
	Class<? extends ICommand> getCouple();
	
	ICommand newCouple();
	PacketHead getHead();
	void setHead(PacketHead innerPacketHead);
	void newHead();
}