package com.bdtd.card.socket.base.command;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.common.log.LOG;
import com.bdtd.card.common.util.IpUtil;
import com.bdtd.card.socket.base.annotation.Command;
import com.bdtd.card.socket.base.consts.NetConsts;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.PacketHead;
import com.bdtd.card.socket.base.utils.SequenceIdUtil;
import com.bdtd.card.socket.base.utils.UserUtil;

public abstract class AbstractCommand<T> implements ICommand {
	private PacketHead innerPacketHead;
	private Class<? extends ICommand> couple;
	private T data;
	private int nodeId;

	public AbstractCommand() {
		initCommand();
	}

	public AbstractCommand(T data) {
		this.data = data;
		this.initCommand();
	}

	private void initCommand() {
		Command command = this.getClass().getAnnotation(Command.class);
		if (command != null) {
			Long userId = UserUtil.getUserId();
			int moduleId = command.module().getModuleId();
			int commandId = command.commandId();
			CommandCategory commandCategory = command.category();
			long timestamp = System.currentTimeMillis();
			int sequenceId = SequenceIdUtil.generatorId(moduleId, commandId);
			int toNodeId = NetConsts.DEFAULT_SERVER_NODE_ID;
			innerPacketHead = new PacketHead(commandCategory, moduleId, commandId, sequenceId, timestamp, toNodeId ,
					this.nodeId, userId , IpUtil.getLocalAddressInt());

			couple = command.couple();
		} else {
			throw new RuntimeException(this.getClass() + "未添加@Command注解，无法初始化命令参数");
		}
	}

	public ICommand newCouple() {
		Class<? extends ICommand> couple = getCouple();
		try {
			ICommand res = couple.newInstance();
			PacketHead coupleHead = res.getHead();
			PacketHead thisHead = getHead();
			coupleHead.setSequenceId(thisHead.getSequenceId());
			coupleHead.setTimestamp(System.currentTimeMillis());
			coupleHead.setToNodeId(thisHead.getFromNodeId());
			coupleHead.setFromNodeId(thisHead.getToNodeId());
			coupleHead.setUserId(thisHead.getUserId());
			coupleHead.setIp(IpUtil.getLocalAddressInt());
			coupleHead.setModuleId(thisHead.getModuleId());
			coupleHead.setCommandId(thisHead.getCommandId());
			coupleHead.setCommandCategory(thisHead.getCommandCategory());

			return res;
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(BdtdModule.NETWORK, e, "new couple fail");
			return null;
		}
	}

	public Class<? extends ICommand> getCouple() {
		return couple;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	@Override
	public PacketHead getHead() {
		return innerPacketHead;
	}

	public void setHead(PacketHead innerPacketHead) {
		this.innerPacketHead = innerPacketHead;
	}

	public BdtdModule getModule() {
		return BdtdModule.getModule(this.innerPacketHead.getModuleId());
	}

	public int getNodeId() {
		return nodeId;
	}

	public void setNodeId(int nodeId) {
		this.nodeId = nodeId;
	}

	@Override
	public boolean isRequest() {
		return this.getHead().getCommandCategory() == CommandCategory.REQUEST;
	}

	@Override
	public boolean isResponse() {
		return this.getHead().getCommandCategory() == CommandCategory.RESPONSE;
	}

	@Override
	public boolean isPublish() {
		return this.getHead().getCommandCategory() == CommandCategory.PUBLISH;
	}

	@Override
	public int getModuleId() {
		return this.innerPacketHead.getModuleId();
	}

	@Override
	public int getCommandId() {
		return this.innerPacketHead.getCommandId();
	}

	@Override
	public CommandCategory getCommandCategory() {
		return this.innerPacketHead.getCommandCategory();
	}

	@Override
	public void newHead() {

	}

	@Override
	public int getSequenceId() {
		return this.innerPacketHead.getSequenceId();
	}

}
