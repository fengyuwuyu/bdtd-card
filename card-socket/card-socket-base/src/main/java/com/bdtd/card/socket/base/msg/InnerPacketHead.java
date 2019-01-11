package com.bdtd.card.socket.base.msg;

import java.net.InetAddress;
import java.nio.ByteOrder;

import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.model.MessageDirection;
import com.bdtd.card.socket.base.utils.ByteBufUtil;

import io.netty.buffer.ByteBuf;

final public class InnerPacketHead extends PacketHead {
	static final byte DIRECTION_MASK_FLAG = (byte) 0x80;
	static final byte SERVER_TO_SERVER_MASK_FLAG = (byte)0x08;
	public static final byte BYTE_ORDER_MASK_FLAG = 0x40;
	static final byte REQUEST_RESPONSE_FLAG = 0x20;
	static final byte PUBLISH_FLAG = 0x10;
	static final byte APPENDING_ALIGENMENT_MASK = 0x03;
	static final byte LEGAL_MASK = DIRECTION_MASK_FLAG + BYTE_ORDER_MASK_FLAG + REQUEST_RESPONSE_FLAG + PUBLISH_FLAG
			+ APPENDING_ALIGENMENT_MASK + SERVER_TO_SERVER_MASK_FLAG;
	static final byte ILLEGAL_MASK = ~LEGAL_MASK;
	static final int USER_ID_OFFSET = 26;
	static final int TO_NODE_ID_OFFSET = 18;
	static final int FROM_NODE_ID_OFFSET = 22;
	static final int USER_IP_OFFSET = 34;
	static final int USER_PORT_OFFSET = 38;
	static final int TIMESTAMP_OFFSET = 10;
	private ByteOrder byteOrder;
	private CommandCategory commandCategory;
	private MessageDirection messageDirection;
	private byte encodeMask = 0;
	private short moduleId;
	private short commandId;
	private int sequenceId;
	private long timeStamp;
	private int toNodeId;
	private int fromNodeId;
	private long userId;
	private int userIP; //该int既是ip又是version
	private short port;
	private int errorCode;
	public static final int HEAD_LENGTH = 48;
	public static final int VERSION_MASK = 0x00ffffff;
	public static final int APP_ID_MASK = 0xff000000;
	
	static {
		ByteBuf buf = ByteBufUtil.createFromUnpool(128);
		InnerPacketHead head = new InnerPacketHead();
		head.messageDirection = MessageDirection.CLIENT_TO_SERVER;
		head.commandCategory = CommandCategory.PUBLISH;
		head.byteOrder = ByteOrder.BIG_ENDIAN;
		boolean res = head.writeBuff(buf);
		if(!res) {
			throw new ExceptionInInitializerError("innerPackeHead write exception");
		}
		int length = buf.writerIndex();
		if(length != HEAD_LENGTH) {
			throw new ExceptionInInitializerError(String.format("header length is [%d] should be [%d]", length, HEAD_LENGTH));
		}
		buf.release();
	}
	
	
	public static byte getEncodeMask(byte [] bytes, int headOffset) {
		return bytes[headOffset + 1];
	}
	
	public static byte getEncodeMask(ByteBuf buf, int headOffset) {
		return buf.getByte(headOffset + 1);
	}

	@Override
	public int getHeadLength() {
		return HEAD_LENGTH;
	}

	public byte getEncodeMask() {
		return encodeMask;
	}
	
	public short getPort() {
		return this.port;
	}
	
	public void setPort(short port) {
		this.port = port;
	}

	public InnerPacketHead setEncodeMask(byte encodeMask) {
		this.encodeMask = encodeMask;
		return this;
	}

	public int getToNodeId() {
		return toNodeId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
	
	public void setUserIp(int ip) {
		this.userIP = ip;
	}
	
	public void serVersion(int version) {
		this.userIP = ((this.userIP & APP_ID_MASK) | (version & VERSION_MASK));
	}
	
	public int getVersion() {
		return this.userIP & VERSION_MASK;
	}
	
	public void setAppId(int appId) {
		this.userIP = ((this.userIP & VERSION_MASK) | (appId << 24));
	}
	
	public int getAppId() {
		return ((this.userIP & APP_ID_MASK) >>> 24);
	}
	
	public int getUserIp() {
		return this.userIP;
	}
	
	public String getUserIpAddress() {
		byte[] bytes = new byte[4];
		bytes[0] = (byte)((userIP >>> 24) & 0xff);
		bytes[1] = (byte)((userIP >>> 16) & 0xff);
		bytes[2] = (byte)((userIP >>> 8) & 0xff);
		bytes[3] = (byte)(userIP & 0xff);
		try {
			InetAddress address = InetAddress.getByAddress(bytes);
			return address.getHostAddress();
		}
		catch(Throwable e) {
			return "0.0.0.0";
		}
	}
	
//	public void setIpAddress(InetAddress address) {
//		try {
//			byte[] mybtes = address.getAddress();
//			final long pumpeIPAddress =
//			      ((mybtes [0] & 0xFFl) << (3*8)) + 
//			      ((mybtes [1] & 0xFFl) << (2*8)) +
//			      ((mybtes [2] & 0xFFl) << (1*8)) +
//			      (mybtes [3] &  0xFFl);
//			this.userId = (int)(pumpeIPAddress & 0xffffffffL);
//		}
//		catch(Throwable e) {
//			this.userId = 0;
//		}
//	}

	public InnerPacketHead setToNodeId(int toNodeId) {
		this.toNodeId = toNodeId;
		return this;
	}
	
	public InnerPacketHead copy() {
		InnerPacketHead newOne = new InnerPacketHead();
		newOne.byteOrder = this.byteOrder;
		newOne.commandCategory = this.commandCategory;
		newOne.messageDirection = this.messageDirection;
		newOne.encodeMask = this.encodeMask;
		newOne.moduleId = this.moduleId;
		newOne.commandId = this.commandId;
		newOne.sequenceId = this.sequenceId;
		newOne.timeStamp = this.timeStamp;
		newOne.toNodeId = this.toNodeId;
		newOne.fromNodeId = this.fromNodeId;
		newOne.userId = this.userId;
		newOne.errorCode = this.errorCode;
		newOne.contextLength = this.contextLength;
		newOne.userIP = this.userIP;
		return newOne;
	}

	public int getFromNodeId() {
		return fromNodeId;
	}

	public void setFromNodeId(int fromNodeId) {
		this.fromNodeId = fromNodeId;
	}

	public ByteOrder getByteOrder() {
		return byteOrder;
	}

	public CommandCategory getCommandCategory() {
		return commandCategory;
	}

	public MessageDirection getMessageDirection() {
		return messageDirection;
	}

	public ByteOrder byteOrder() {
		return byteOrder;
	}

	public InnerPacketHead setByteOrder(ByteOrder order) {
		this.byteOrder = order;
		return this;
	}

	public CommandCategory commandCategory() {
		return commandCategory;
	}

	public InnerPacketHead setCommandCategory(CommandCategory commandCategory) {
		this.commandCategory = commandCategory;
		return this;
	}

	public MessageDirection messageDirection() {
		return this.messageDirection;
	}

	public InnerPacketHead setMessageDirection(MessageDirection messageDirection) {
		this.messageDirection = messageDirection;
		return this;
	}

	public InnerPacketHead setModuleId(short moduleId) {
		this.moduleId = moduleId;
		return this;
	}

	public short getModuleId() {
		return this.moduleId;
	}

	public short getCommandId() {
		return commandId;
	}

	public void setCommandId(short commandId) {
		this.commandId = commandId;
	}

	public InnerPacketHead setSequenceId(int sequenceId) {
		this.sequenceId = sequenceId;
		return this;
	}

	public int getSequenceId() {
		return this.sequenceId;
	}

	public InnerPacketHead setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
		return this;
	}

	public long getTimeStamp() {
		return this.timeStamp;
	}

	public InnerPacketHead setErrorCode(int errorCode) {
		this.errorCode = errorCode;
		return this;
	}

	public int getErrorCode() {
		return this.errorCode;
	}
	
	public static void writeUserId(InnerPacketHead head, long userId, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + USER_ID_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeLongLE(userId);
		}
		else {
			buf.writeLong(userId);
		}
		buf.writerIndex(origineIndex);
	}
	
	public static void writeTimestamp(InnerPacketHead head, long timestamp, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + TIMESTAMP_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeLongLE(timestamp);
		}
		else {
			buf.writeLong(timestamp);
		}
		buf.writerIndex(origineIndex);
	}
	
	public static void writeToNodeId(InnerPacketHead head, int toNodeId, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + TO_NODE_ID_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeIntLE(toNodeId);
		}
		else {
			buf.writeInt(toNodeId);
		}
		buf.writerIndex(origineIndex);
	}
	
	public static void writeFromNodeId(InnerPacketHead head, int fromNodeId, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + FROM_NODE_ID_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeIntLE(fromNodeId);
		}
		else {
			buf.writeInt(fromNodeId);
		}
		buf.writerIndex(origineIndex);
	}
	
	public static void writeUserIp(InnerPacketHead head, int userIp, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + USER_IP_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeIntLE(userIp);
		}
		else {
			buf.writeInt(userIp);
		}
		buf.writerIndex(origineIndex);
	}
	
	public static void writeUserPort(InnerPacketHead head, short port, ByteBuf buf, int start) {
		int origineIndex = buf.writerIndex();
		buf.writerIndex(start + USER_PORT_OFFSET);
		if(head.getByteOrder() == ByteOrder.LITTLE_ENDIAN) {
			buf.writeShortLE(port);
		}
		else {
			buf.writeShort(port);
		}
		buf.writerIndex(origineIndex);
	}

	@Override
	public boolean readBuff(ByteBuf buf) {
		boolean res = false;
		if(HEAD_LENGTH > buf.readableBytes()) {
			return false;
		}
		byte headMask = buf.readByte();
		if (checkMask(headMask)) {
			setMask(headMask);
			encodeMask = buf.readByte();
			if (byteOrder == ByteOrder.LITTLE_ENDIAN) {
				moduleId = buf.readShortLE();
				commandId = buf.readShortLE();
				sequenceId = buf.readIntLE();
				timeStamp = buf.readLongLE();
				toNodeId = buf.readIntLE();
				fromNodeId = buf.readIntLE();
				userId = buf.readLongLE();
				this.userIP = buf.readIntLE();
				this.port = buf.readShortLE();
				errorCode = buf.readIntLE();
				contextLength = buf.readIntLE();
			} else {
				moduleId = buf.readShort();
				commandId = buf.readShort();
				sequenceId = buf.readInt();
				timeStamp = buf.readLong();
				toNodeId = buf.readInt();
				fromNodeId = buf.readInt();
				userId = buf.readLong();
				this.userIP = buf.readInt();
				this.port = buf.readShort();
				errorCode = buf.readInt();
				contextLength = buf.readInt();
			}
			res = true;
		}
		return res;
	}

	/**
	 * @throws IndexOutOfBoundsException
	 *             if {@code this.writableBytes} is less than {@code 1}
	 */
	@Override
	public boolean writeBuff(ByteBuf buf) {
		byte headMask = getMask();
		if(this.byteOrder == ByteOrder.BIG_ENDIAN) {
			buf.writeByte(headMask);
			buf.writeByte(encodeMask);
			buf.writeShort(moduleId);
			buf.writeShort(commandId);
			buf.writeInt(sequenceId);
			buf.writeLong(timeStamp);

			buf.writeInt(toNodeId);
			buf.writeInt(fromNodeId);
			buf.writeLong(userId);
			buf.writeInt(this.userIP);
			buf.writeShort(this.port);
			buf.writeInt(errorCode);
			buf.writeInt(contextLength);
		}
		else {
			buf.writeByte(headMask);
			buf.writeByte(encodeMask);
			buf.writeShortLE(moduleId);
			buf.writeShortLE(commandId);
			buf.writeIntLE(sequenceId);
			buf.writeLongLE(timeStamp);

			buf.writeIntLE(toNodeId);
			buf.writeIntLE(fromNodeId);
			buf.writeLongLE(userId);
			buf.writeIntLE(this.userIP);
			buf.writeShortLE(this.port);
			buf.writeIntLE(errorCode);
			buf.writeIntLE(contextLength);
		}
		return true;
	}

	private boolean checkMask(byte mask) {
		return (mask & ILLEGAL_MASK) == 0;
	}

	/**
	 * 
	 * 此方法是设置包头标记
	 *
	 * @param mask
	 * @author Terry
	 * @time 2016年5月18日
	 */
	private void setMask(byte mask) {
		byteOrder = (mask & BYTE_ORDER_MASK_FLAG) == 0 ? ByteOrder.LITTLE_ENDIAN : ByteOrder.BIG_ENDIAN;
		messageDirection = (mask & SERVER_TO_SERVER_MASK_FLAG) == 0 ? 
				((mask & DIRECTION_MASK_FLAG) == 0 ? MessageDirection.CLIENT_TO_SERVER : MessageDirection.SERVER_TO_CLIENT) 
				: MessageDirection.SERVER_TO_SERVER;
		if ((mask & PUBLISH_FLAG) != 0) {
			commandCategory = CommandCategory.PUBLISH;
		} else {
			commandCategory = (mask & REQUEST_RESPONSE_FLAG) == 0 ? CommandCategory.RESPONSE : CommandCategory.REQUEST;
		}
	}

	/**
	 * 
	 * 此方法是获取包头标记
	 *
	 * @return
	 * @author Terry
	 * @time 2016年5月18日
	 */
	
	private byte getMask() {
		byte mask = 0;
		assert messageDirection != null && byteOrder != null && commandCategory != null;
		if(messageDirection == MessageDirection.SERVER_TO_SERVER) {
			mask |= SERVER_TO_SERVER_MASK_FLAG;
		}
		else {
			if (messageDirection == MessageDirection.SERVER_TO_CLIENT) {
				// 服务器发往客户端，最高位为1
				mask |= DIRECTION_MASK_FLAG;
			}
		}
		if (byteOrder == ByteOrder.BIG_ENDIAN) {
			// 采用大端，次高位为1
			mask |= BYTE_ORDER_MASK_FLAG;
		}
		if (commandCategory == CommandCategory.PUBLISH) {
			mask |= PUBLISH_FLAG;
		} else if (commandCategory == CommandCategory.REQUEST) {
			// 该命令为请求命令，次次高位为1
			mask |= REQUEST_RESPONSE_FLAG;
		}
		return mask;
	}

//	@Override
//	public String toString() {
//		return "InnerPacketHead [byteOrder=" + byteOrder + ", commandCategory=" + commandCategory
//				+ ", messageDirection=" + messageDirection  + ", reserveMask="
//				+ encodeMask + ", moduleId=" + moduleId + ", commandId=" + commandId + ", sequenceId=" + sequenceId
//				+ ", timeStamp=" + timeStamp + ", toNodeId=" + toNodeId + ", fromNodeId=" + fromNodeId + ", userId="
//				+ userId + ", port=" + port + ", errorCode=" + errorCode + "]";
//	}
	
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
		builder.append(errorCode);
		builder.append("]");
		return builder.toString();
	}
	
	public static void main(String[] args) {
		InnerPacketHead l = new InnerPacketHead();
		System.out.println(l.getAppId());
		System.out.println(l.toString());
	}
	
	
	
}
