package com.bdtd.card.socket.base.callback;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.context.INetContext;
import com.bdtd.card.socket.base.exception.DuplicatedOperateException;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.PacketHead;

public interface ICallback<T> {
	PacketHead getHeader();
	INetContext getRemoteInvoker();
	CommandCategory getCategory();
	ICommand<T> getCommand();
	boolean isFail();
	boolean isResponse();
	boolean isRequest();
	boolean isPublish();
	BdtdError getError();
	void setFailure(BdtdError error) throws DuplicatedOperateException;
	boolean tryFailure(BdtdError error);
}
