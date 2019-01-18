package com.bdtd.card.base.service.msg;

import com.bdtd.card.base.service.model.CommandCategory;

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
