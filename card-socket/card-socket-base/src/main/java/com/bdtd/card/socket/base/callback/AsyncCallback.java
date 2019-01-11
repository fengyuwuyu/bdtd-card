package com.bdtd.card.socket.base.callback;

import com.bdtd.card.base.common.base.model.BdtdError;

public interface AsyncCallback<T> {

	void complete(T result, BdtdError error);
}
