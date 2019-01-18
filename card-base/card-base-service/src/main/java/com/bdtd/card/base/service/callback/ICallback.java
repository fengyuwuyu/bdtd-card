package com.bdtd.card.base.service.callback;

import com.bdtd.card.base.service.command.ICommand;
import com.bdtd.card.base.service.context.IContext;
import com.bdtd.card.base.service.exception.DuplicatedOperateException;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.base.service.msg.PacketHead;
import com.bdtd.card.common.base.model.BdtdError;

public interface ICallback {
	PacketHead getHeader();
	IContext getRemoteInvoker();
	CommandCategory getCategory();
	ICommand getCommand();
	boolean isFail();
	boolean isResponse();
	boolean isRequest();
	boolean isPublish();
	BdtdError getError();
	void setFailure(BdtdError error) throws DuplicatedOperateException;
	boolean tryFailure(BdtdError error);
}
