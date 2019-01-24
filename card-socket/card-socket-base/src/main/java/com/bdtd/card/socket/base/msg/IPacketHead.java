package com.bdtd.card.socket.base.msg;

import com.bdtd.card.socket.base.model.CommandCategory;

public interface IPacketHead {
	
	int getModuleId();
	
	int getCommandId();

	long getUserId();
	
	int getFromNodeId();
	
	int getToNodeId();
	
	int getIp();
	
	long getTimeStamp();
	
	CommandCategory getCommandCategory();
	
	int getSequenceId();
	
	IPacketHead copy();
	
}
