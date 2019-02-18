package com.bdtd.card.socket.base.msg;

import com.bdtd.card.socket.base.model.CommandCategory;

public interface IPacketHead {
	
	int getModuleId();
	
	int getCommandId();

	long getUserId();
	
	IPacketHead setUserId(long userId);
	
	int getFromNodeId();
	
	IPacketHead setFromNodeId(int fromNodeId);
	
	int getToNodeId();
	
	IPacketHead setToNodeId(int toNodeId);
	
	int getIp();
	
	long getTimestamp();
	
	IPacketHead setTimestamp(long timeStamp);
	
	CommandCategory getCommandCategory();
	
	int getSequenceId();
	
	IPacketHead setSequenceId(int sequenceId);
	
	IPacketHead copy();
	
	IPacketHead newCouple();
	
}
