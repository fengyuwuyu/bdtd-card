package com.bdtd.card.socket.base.exception;

import com.bdtd.card.common.base.model.BdtdError;

public class NetUnknowException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -718723805986640718L;
	
	public NetUnknowException() {
        super();
    }

    public NetUnknowException(String message) {
        super(message);
    }
    
    public NetUnknowException(BdtdError error) {
    	super(error.getMessage());
    }
    
    public NetUnknowException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public NetUnknowException(BdtdError error, Throwable cause) {
        super(error.getMessage(), cause);
    }

    public NetUnknowException(Throwable cause) {
        super(cause);
    }
}
