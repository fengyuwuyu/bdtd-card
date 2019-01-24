package com.bdtd.card.base.service.msg;

import java.net.InetAddress;

import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.common.util.IpUtil;

final public class PacketHead implements IPacketHead {
	private CommandCategory commandCategory;
	private int moduleId;
	private int commandId;
	private int sequenceId;
	private long timeStamp;
	private int toNodeId;
	private int fromNodeId;
	private long userId;
	private int ip; 
	
	public PacketHead() {
		super();
	}
	
	

	public PacketHead(CommandCategory commandCategory, int moduleId, int commandId, long timeStamp) {
		super();
		
		if (commandCategory == null) {
			throw new IllegalArgumentException("commandCategory is required");
		}
		
		this.commandCategory = commandCategory;
		this.moduleId = moduleId;
		this.commandId = commandId;
		this.timeStamp = timeStamp;
	}

	public int getToNodeId() {
		return toNodeId;
	}

	@Override
	public IPacketHead setToNodeId(int toNodeId) {
		this.toNodeId = toNodeId;
		return this;
	}

	public long getUserId() {
		return userId;
	}

	@Override
	public IPacketHead setUserId(long userId) {
		this.userId = userId;
		return this;
	}

	public int getFromNodeId() {
		return fromNodeId;
	}

	@Override
	public IPacketHead setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
		return this;
	}

	@Override
	public IPacketHead setFromNodeId(int fromNodeId) {
		this.fromNodeId = fromNodeId;
		return this;
	}

	public CommandCategory getCommandCategory() {
		return commandCategory;
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
	
	public IPacketHead setSequenceId(int sequenceId) {
		this.sequenceId = sequenceId;
		return this;
	}

	public long getTimeStamp() {
		return this.timeStamp;
	}
	
	public IPacketHead setIp(int ip) {
		this.ip = ip;
		return this;
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
	public IPacketHead newCouple() {
		CommandCategory commandCategory = null;
		if (this.commandCategory == CommandCategory.REQUEST) {
			commandCategory = CommandCategory.RESPONSE;
		} else if (this.commandCategory == CommandCategory.RESPONSE) {
			commandCategory = CommandCategory.REQUEST;
		}
		
		PacketHead couple = new PacketHead();
		couple.commandCategory = commandCategory;
		couple.moduleId = this.moduleId;
		couple.commandId = this.commandId;
		couple.sequenceId = this.sequenceId;
		couple.timeStamp = this.timeStamp;
		couple.toNodeId = this.fromNodeId;
		couple.fromNodeId = this.toNodeId;
		couple.userId = this.userId;
		couple.ip = IpUtil.getLocalAddressInt();
		return couple;
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

}
