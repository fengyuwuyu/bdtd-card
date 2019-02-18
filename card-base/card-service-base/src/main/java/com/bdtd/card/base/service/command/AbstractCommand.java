package com.bdtd.card.base.service.command;

import com.bdtd.card.base.service.annotation.Command;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.base.service.msg.PacketHead;
import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.common.log.LOG;

public abstract class AbstractCommand implements ICommand {
	private PacketHead innerPacketHead;
	private Class<? extends ICommand> couple;
	private ICommand clientRequest;
	private long timestamp;

	public AbstractCommand() {
		Command command = this.getClass().getAnnotation(Command.class);
		if (command != null) {
			int moduleId = command.module().getModuleId();
			int commandId = command.commandId();
			CommandCategory commandCategory = command.category();
			innerPacketHead = new PacketHead(commandCategory, moduleId, commandId, System.currentTimeMillis());

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
			coupleHead.setIp(thisHead.getIp());
			if (thisHead.getCommandCategory() == CommandCategory.REQUEST) {
				res.setClientRequest(this);
			}

			res.setTimestamp(System.currentTimeMillis());

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

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public void setClientRequest(ICommand request) {
		clientRequest = request;
	}

	@Override
	public ICommand getClientRequest() {
		return clientRequest;
	}

	@Override
	public boolean isRequest() {
		return this.getHead().getCommandCategory() == CommandCategory.REQUEST;
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
	public void setClientRequest(AbstractCommand abstractCommand) {
		this.clientRequest = abstractCommand;
	}

}
