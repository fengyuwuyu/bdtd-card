package com.bdtd.card.socket.base.exception;

import com.bdtd.card.common.base.model.BdtdError;

public class DuplicatedOperateException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3311424182813699815L;

	public DuplicatedOperateException() {
		super();
	}

	public DuplicatedOperateException(String message, Throwable cause) {
		super(message, cause);
	}

	public DuplicatedOperateException(String message) {
		super(message);
	}

	public DuplicatedOperateException(Throwable cause) {
		super(cause);
	}
	
	public DuplicatedOperateException(BdtdError error) {
		super(error.getMessage());
	}

}
