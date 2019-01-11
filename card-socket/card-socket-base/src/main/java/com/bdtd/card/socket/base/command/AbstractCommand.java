package com.bdtd.card.socket.base.command;

import java.nio.ByteOrder;

import com.bdtd.card.base.common.base.model.BdtdModule;
import com.bdtd.card.base.common.log.LOG;
import com.bdtd.card.socket.base.annotation.Command;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.model.EncodeMasks;
import com.bdtd.card.socket.base.model.MessageDirection;
import com.bdtd.card.socket.base.msg.InnerPacketHead;

public abstract class AbstractCommand implements ICommand {
	protected short moduleId;
	protected short commandId;
	protected CommandCategory commandCategory;
	private InnerPacketHead innerPacketHead;
	private Class<? extends ICommand> couple;
	private ICommand clientRequest;
	private long arrivedTimestampMS;

	public AbstractCommand() {
		Command command = this.getClass().getAnnotation(Command.class);
		if (command != null) {
			moduleId = (short) command.module().getModuleId();
			commandId = command.commandId();
			commandCategory = command.category();
			couple = command.couple();
			if (couple == ICommand.class) {
				couple = null;
			}
		} else {
			throw new RuntimeException(this.getClass() + "未添加@Command注解，无法初始化命令参数");
		}
	}

	public void newHead() {
		innerPacketHead = new InnerPacketHead();
		this.initHead(innerPacketHead);
	}

	public ICommand newCouple() {
		Class<? extends ICommand> couple = getCouple();
		if (couple != null) {
			try {
				ICommand res = couple.newInstance();
				res.newHead();
				InnerPacketHead coupleHead = res.getHead();
				InnerPacketHead thisHead = getHead();
				coupleHead.setSequenceId(thisHead.getSequenceId());
				coupleHead.setTimeStamp(thisHead.getTimeStamp());
				coupleHead.setToNodeId(thisHead.getFromNodeId());
				coupleHead.setFromNodeId(thisHead.getToNodeId());
				coupleHead.setUserId(thisHead.getUserId());
				coupleHead.setUserIp(thisHead.getUserIp());
				coupleHead.setPort(thisHead.getPort());
				if (thisHead.getMessageDirection() == MessageDirection.SERVER_TO_CLIENT) {
					coupleHead.setMessageDirection(MessageDirection.CLIENT_TO_SERVER);
				} else if (thisHead.getMessageDirection() == MessageDirection.CLIENT_TO_SERVER) {
					coupleHead.setMessageDirection(MessageDirection.SERVER_TO_CLIENT);
				} else {
					coupleHead.setMessageDirection(thisHead.getMessageDirection());
				}
				if (thisHead.getEncodeMask() == EncodeMasks.RPC) {
					coupleHead.setEncodeMask(EncodeMasks.RPC);
				} else {
					coupleHead.setEncodeMask(EncodeMasks.NORMAL);
				}
				if (thisHead.commandCategory() == CommandCategory.REQUEST) {
					res.setClientRequest(this);
				}

				/**
				 * for server usage.
				 */
				res.setArrivedTimestamp(System.currentTimeMillis());

				return res;
			} catch (Exception e) {
				e.printStackTrace();
				LOG.error(BdtdModule.NETWORK, e, "new couple fail");
				return null;
			}
		}
		return null;
	}

	public Class<? extends ICommand> getCouple() {
		return couple;
	}

	@Override
	public InnerPacketHead getHead() {
		return innerPacketHead;
	}

	public void setHead(InnerPacketHead innerPacketHead) {
		this.innerPacketHead = innerPacketHead;
	}

	@Override
	public short getModuleId() {
		return moduleId;
	}

	@Override
	public short getCommandId() {
		return commandId;
	}

	@Override
	public CommandCategory getCommandCategory() {
		return commandCategory;
	}

	protected void initHead(InnerPacketHead innerPacketHead) {
		innerPacketHead.setCommandId(this.getCommandId());
		innerPacketHead.setModuleId(this.getModuleId());
		innerPacketHead.setCommandCategory(this.getCommandCategory());
		innerPacketHead.setByteOrder(ByteOrder.BIG_ENDIAN);
		initHeadExceptBase(innerPacketHead);
	}

	protected void initHeadExceptBase(InnerPacketHead innerPacketHead) {

	}

	public BdtdModule getModule() {
		return BdtdModule.getModule((int)this.moduleId);
	}

	@Override
	public void setArrivedTimestamp(long timestampMS) {
		arrivedTimestampMS = timestampMS;
	}

	@Override
	public long getArrivedTimestamp() {
		return arrivedTimestampMS;
	}

	@Override
	public void setClientRequest(ICommand request) {
		clientRequest = request;
	}

	@Override
	public ICommand getClientRequest() {
		return clientRequest;
	}

	protected byte[] getClientEventData() {
		return null;
	}

	protected void setClientEventData(byte[] data) {
	}
}
