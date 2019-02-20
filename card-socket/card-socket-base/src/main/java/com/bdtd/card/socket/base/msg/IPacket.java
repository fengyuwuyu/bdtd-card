package com.bdtd.card.socket.base.msg;

public interface IPacket<T> {

	IPacketHead getPacketHead();
	
	T getData();
	
	long getErrorCode();
}
