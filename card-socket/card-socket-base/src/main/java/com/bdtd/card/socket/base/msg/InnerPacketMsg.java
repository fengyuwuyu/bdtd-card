package com.bdtd.card.socket.base.msg;

import io.netty.buffer.ByteBuf;

public class InnerPacketMsg implements IPacket {

	// 内包消息头
	protected InnerPacketHead head;
	protected ByteBuf packet;
	protected boolean write;
	public InnerPacketMsg(InnerPacketHead innerPacketHead, boolean write) {
		this.write = write;
		head = innerPacketHead ;
	}
	
	public InnerPacketMsg(boolean write) {
		this.write = write;
	}
	
	public void changeType(boolean write) {
		this.write = write;
	}
	
	public ByteBuf innerBodyBuf() {
		if(write) {
			packet.writerIndex(InnerPacketHead.HEAD_LENGTH);
		}
		else {
			//如果是读则，readerindex为头，wriderindex为包长
			packet.readerIndex(InnerPacketHead.HEAD_LENGTH);
		}
		return packet;
	}

	
	public ByteBuf innerHeadBuf() {
		if(write) {
			packet.writerIndex(0);
		}
		else {
			//如果是读则，readerindex为头，wriderindex为包长
			packet.readerIndex(0);
		}
		return packet;
	}
	
	public InnerPacketHead getInnerHead() {
		return head;
	}

	public void setInnerHead(InnerPacketHead innerPacketHead) {
		this.head = innerPacketHead;
	}

	public ByteBuf getInnerPacket() {
		return packet;
	}
	
	
	/**
	 * 
	 * 此方法把一个外包的buffer,直接附着在OuterPacketMsg里面
	 *
	 * @param buf   外包的buffer
	 * @param asRead 
	 * 				true:  只读
	 * 				false: 只写
	 */
	public void attachBuffer(ByteBuf buf) {
		if(haveAttachBuffer()) {
			throw new IllegalStateException(String.format("packetMsg attach buffer fail when this msg "
					+ "have already attached a buffer please check haveAttachBuffer() method"));
		}
		//如果是buf往InnerPacket转，那么buf肯定是只读的buf所以slice完body的writeIndex就被至于最后面
		//如果是一个还没有填充完毕的InnerPacket，InnerPacket里面的ByteBuf还需要继续往里面写东西，
		//那么该ByteBuf一开始被设置就应该设置为0位置为写位
		attachBufferAnyway(buf);
	}
	

	/**
	 * 
	 * 此方法把OuterPacketMsg的buf直接弹出， 弹出后该外包只剩下空壳
	 *
	 * return  OuterPacketMsg的外包
	 */
	public ByteBuf detachBuffer() {
		ByteBuf resPacket = packet;
		packet = null;
		return resPacket;
	}
	
	public boolean haveAttachBuffer() {
		return packet != null;
	}
	
	protected void attachBufferAnyway(ByteBuf buf) {
		if(packet != null && packet != buf) {
			packet.release();
		}
		packet = buf;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("inner packet [head=");
		builder.append(head);
		builder.append("]");
		return builder.toString();
	}
	

}
