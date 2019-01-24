package com.bdtd.card.socket.base.msg;

import com.bdtd.card.base.service.msg.IPacketHead;

public interface IPacket<T> {

	IPacketHead getPacketHead();
	
	T getData();
	
	long getErrorCode();
}
