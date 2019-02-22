package com.bdtd.card.socket.base.exception;

import com.bdtd.card.common.base.model.BdtdError;

public class IllegalOperateException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -718723805986640718L;
	
	public IllegalOperateException() {
        super();
    }

    public IllegalOperateException(String message) {
        super(message);
    }
    
    public IllegalOperateException(BdtdError error) {
    	super(error.getMessage());
    }
    
    public IllegalOperateException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public IllegalOperateException(BdtdError error, Throwable cause) {
        super(error.getMessage(), cause);
    }

    public IllegalOperateException(Throwable cause) {
        super(cause);
    }
}
