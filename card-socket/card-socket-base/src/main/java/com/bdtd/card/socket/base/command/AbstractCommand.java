package com.bdtd.card.socket.base.command;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.common.log.LOG;
import com.bdtd.card.socket.base.annotation.Command;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.PacketHead;

public abstract class AbstractCommand<T> implements ICommand {
	private PacketHead innerPacketHead;
	private Class<? extends ICommand> couple;
	private long timestamp;
	private T data;

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

	public long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
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

}
