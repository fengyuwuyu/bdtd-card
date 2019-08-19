package com.bdtd.card.common.base.exception;

import com.bdtd.card.common.base.annotation.Error;
import com.bdtd.card.common.base.model.EnumError;;

public abstract class AbstractNoticeException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 216189853235784419L;
	private EnumError errorCode = EnumError.UNKNOWN_ERROR;
	private volatile String message;

	public EnumError getErrorCode() {
		return this.errorCode;
	}

	public AbstractNoticeException() {
		this("", null);
	}

	public AbstractNoticeException(EnumError errorCode) {
		this(errorCode, "", null);
	}

	public AbstractNoticeException(EnumError errorCode, String message) {
		this(errorCode, message, null);
	}

	public AbstractNoticeException(EnumError errorCode, String message, Throwable cause) {
		super(message, cause);
		this.errorCode = errorCode;
	}

	public AbstractNoticeException(EnumError errorCode, Throwable cause) {
		this(errorCode, "", cause);
	}

	public AbstractNoticeException(Throwable cause) {
		this("", cause);
	}

	public AbstractNoticeException(String message, Throwable cause) {
		super(message, cause);
		parseAnnotation();
	}

	public AbstractNoticeException(String message) {
		this(message, null);
	}

	@Override
	public String getMessage() {
		if (message == null) {
			if (errorCode != null) {
				message = super.getMessage() + " Exception Error:\n" + errorCode.toString();
			} else {
				message = super.getMessage();
			}
		}
		return message;
	}

	private void parseAnnotation() {
		Error error = this.getClass().getAnnotation(Error.class);
		if (error != null) {
			this.errorCode = error.error();
		}
	}
}
