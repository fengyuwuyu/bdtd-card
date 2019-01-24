package com.bdtd.card.socket.base.callback;

import com.bdtd.card.common.base.model.BdtdError;

public interface AsyncCallback<T> {

	void complete(T result, BdtdError error);
}
