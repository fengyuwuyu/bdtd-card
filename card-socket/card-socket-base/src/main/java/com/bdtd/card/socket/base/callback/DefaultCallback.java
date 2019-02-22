package com.bdtd.card.socket.base.callback;

import java.util.concurrent.atomic.AtomicInteger;

import com.bdtd.card.common.base.model.BdtdError;
import com.bdtd.card.socket.base.command.ICommand;
import com.bdtd.card.socket.base.context.INetContext;
import com.bdtd.card.socket.base.exception.DuplicatedOperateException;
import com.bdtd.card.socket.base.invoke.AbstractInvoke;
import com.bdtd.card.socket.base.model.CommandCategory;
import com.bdtd.card.socket.base.msg.PacketHead;

public class DefaultCallback<T> implements ICallback<T> {

	public static int UNSET = 0;
	public static int FAIL = 1;
	public static int SUCCESS = 2;

	private ICommand<T> command;
	private INetContext remoteInvokerCtx;
	private BdtdError error;
	protected AbstractInvoke invoker;
	protected Class<? extends ICommand<T>> responseClass;
	protected AtomicInteger haveResult = new AtomicInteger(0);

	public DefaultCallback() {
	}

	public DefaultCallback(ICommand<T> command, INetContext ctx, AbstractInvoke invoker,
			Class<? extends ICommand<T>> responseClass) {
		this.command = command;
		this.remoteInvokerCtx = ctx;
		this.invoker = invoker;
		this.responseClass = responseClass;
		error = BdtdError.NO_ERROR;
	}

	@Override
	public PacketHead getHeader() {
		return command.getHead();
	}

	@Override
	public INetContext getRemoteInvoker() {
		return remoteInvokerCtx;
	}

	@Override
	public boolean isFail() {
		return haveResult.get() == FAIL;
	}

	@Override
	public BdtdError getError() {
		return error;
	}

	@Override
	public void setFailure(BdtdError error) throws DuplicatedOperateException {
		if (haveResult.compareAndSet(UNSET, FAIL)) {
			this.error = error;
			if (isRequest()) {
//				invoker.sendFail(this, responseClass, error);
			}
		} else {
			throw new DuplicatedOperateException();
		}
	}

	protected boolean updateSuccessState() {
		return haveResult.compareAndSet(UNSET, SUCCESS);
	}

	@Override
	public boolean tryFailure(BdtdError error) {
		if (haveResult.compareAndSet(UNSET, FAIL)) {
			this.error = error;
			if (isRequest()) {
//				invoker.sendFail(this, responseClass, error);
			}
			return true;
		}
		return false;
	}

	@Override
	public CommandCategory getCategory() {
		return getHeader().getCommandCategory();
	}

	@Override
	public boolean isResponse() {
		return getHeader().getCommandCategory() == CommandCategory.RESPONSE;
	}

	@Override
	public boolean isRequest() {
		return getHeader().getCommandCategory() == CommandCategory.REQUEST;
	}

	@Override
	public boolean isPublish() {
		return getHeader().getCommandCategory() == CommandCategory.PUBLISH;
	}

	@Override
	public ICommand<T> getCommand() {
		return this.command;
	}

}
