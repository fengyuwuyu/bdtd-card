package com.bdtd.card.base.service.callback;

import com.bdtd.card.common.base.model.BdtdError;

public interface AsyncCallback<T> {

	void complete(T result, BdtdError error);
}
