package com.bdtd.card.base.service.msg;

public interface IPacket<T> {

	IPacketHead getPacketHead();
	
	T getData();
	
	long getErrorCode();
}
