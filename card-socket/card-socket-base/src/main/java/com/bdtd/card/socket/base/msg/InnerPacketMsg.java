package com.bdtd.card.socket.base.msg;

public class InnerPacketMsg<T> implements IPacket<T> {

	// 内包消息头
	protected PacketHead head;
	protected T t;
	protected long errorCode;

	public InnerPacketMsg() {
		super();
	}

	public InnerPacketMsg(PacketHead head, long errorCode) {
		super();
		this.head = head;
		this.errorCode = errorCode;
	}

	public InnerPacketMsg(PacketHead head, T t) {
		super();
		this.head = head;
		this.t = t;
	}

	@Override
	public IPacketHead getPacketHead() {
		return this.head;
	}

	@Override
	public T getData() {
		return this.t;
	}

	@Override
	public long getErrorCode() {
		return this.errorCode;
	}

}
