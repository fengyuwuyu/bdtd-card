package com.bdtd.card.socket.base.msg;

import java.net.InetAddress;

import com.bdtd.card.base.service.msg.IPacketHead;
import com.bdtd.card.socket.base.model.CommandCategory;

final public class PacketHead implements IPacketHead {
	private CommandCategory commandCategory;
	private int moduleId;
	private int commandId;
	private int sequenceId;
	private long timeStamp;
	private int toNodeId;
	private int fromNodeId;
	private long userId;
	private int ip; //该int既是ip又是version
	
	public PacketHead() {
		super();
	}

	public PacketHead(CommandCategory commandCategory, int moduleId, int commandId, int sequenceId,
			long timeStamp, int toNodeId, int fromNodeId, long userId, int ip) {
		super();
		if (commandCategory == null) {
			throw new IllegalArgumentException("commandCategory is required");
		}
		
		this.commandCategory = commandCategory;
		this.moduleId = moduleId;
		this.commandId = commandId;
		this.sequenceId = sequenceId;
		this.timeStamp = timeStamp;
		this.toNodeId = toNodeId;
		this.fromNodeId = fromNodeId;
		this.userId = userId;
		this.ip = ip;
	}

	public int getToNodeId() {
		return toNodeId;
	}

	public long getUserId() {
		return userId;
	}

	public int getIp() {
		return this.ip;
	}
	
	public String getUserIpAddress() {
		byte[] bytes = new byte[4];
		bytes[0] = (byte)((ip >>> 24) & 0xff);
		bytes[1] = (byte)((ip >>> 16) & 0xff);
		bytes[2] = (byte)((ip >>> 8) & 0xff);
		bytes[3] = (byte)(ip & 0xff);
		try {
			InetAddress address = InetAddress.getByAddress(bytes);
			return address.getHostAddress();
		}
		catch(Throwable e) {
			return "0.0.0.0";
		}
	}
	
	public void setIpAddress(InetAddress address) {
		try {
			byte[] mybtes = address.getAddress();
			final long pumpeIPAddress =
			      ((mybtes [0] & 0xFFl) << (3*8)) + 
			      ((mybtes [1] & 0xFFl) << (2*8)) +
			      ((mybtes [2] & 0xFFl) << (1*8)) +
			      (mybtes [3] &  0xFFl);
			this.userId = (int)(pumpeIPAddress & 0xffffffffL);
		}
		catch(Throwable e) {
			this.userId = 0;
		}
	}

	public int getFromNodeId() {
		return fromNodeId;
	}

	public int getModuleId() {
		return this.moduleId;
	}

	public int getCommandId() {
		return commandId;
	}

	public int getSequenceId() {
		return this.sequenceId;
	}

	public long getTimeStamp() {
		return this.timeStamp;
	}
	
	public PacketHead copy() {
		PacketHead newOne = new PacketHead();
		newOne.commandCategory = this.commandCategory;
		newOne.moduleId = this.moduleId;
		newOne.commandId = this.commandId;
		newOne.sequenceId = this.sequenceId;
		newOne.timeStamp = this.timeStamp;
		newOne.toNodeId = this.toNodeId;
		newOne.fromNodeId = this.fromNodeId;
		newOne.userId = this.userId;
		newOne.ip = this.ip;
		return newOne;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("InnerPacketHead [");
		builder.append("mid=");
		builder.append(moduleId);
		builder.append(", cmd=");
		builder.append(commandId);
		builder.append(", sid=");
		builder.append(sequenceId);
		builder.append(", category=");
		builder.append(commandCategory);
		builder.append(", userId=");
		builder.append(userId);
		builder.append(", timestamp=");
		builder.append(timeStamp);
		builder.append(", tonid=");
		builder.append(toNodeId);
		builder.append(", fromnid=");
		builder.append(fromNodeId);
		builder.append(", error=");
		builder.append("]");
		return builder.toString();
	}

	@Override
	public IPacketHead setUserId(long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IPacketHead setFromNodeId(int fromNodeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IPacketHead setToNodeId(int toNodeId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IPacketHead setTimeStamp(long timeStamp) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public com.bdtd.card.base.service.model.CommandCategory getCommandCategory() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IPacketHead setSequenceId(int sequenceId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public IPacketHead newCouple() {
		// TODO Auto-generated method stub
		return null;
	}

}
