package com.bdtd.card.socket.base.msg;

import io.netty.buffer.ByteBuf;

public abstract class PacketHead{

	//包体长度
	protected int contextLength;

	public abstract int getHeadLength();
	public int getPacketLength() {
		return getHeadLength() + getContextLength();
	}
	public int getContextLength() {
		return contextLength;
	}

	public void setContextLength(int contextLength) {
		this.contextLength = contextLength;
	}
	
	public abstract boolean readBuff(ByteBuf contentBuff);
	public abstract boolean writeBuff(ByteBuf byteBuf);
	
}
