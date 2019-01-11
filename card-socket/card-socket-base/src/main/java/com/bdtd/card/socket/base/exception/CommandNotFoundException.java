package com.bdtd.card.socket.base.exception;

import com.bdtd.card.base.common.base.annotation.Error;
import com.bdtd.card.base.common.base.exception.AbstractNoticeException;
import com.bdtd.card.base.common.base.model.BdtdError;


@Error(error= BdtdError.COMMAND_NOT_FOUND)
public class CommandNotFoundException extends AbstractNoticeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2289554514726221958L;

	public CommandNotFoundException() {
		super();
	}
	
    public CommandNotFoundException(String message) {
        super(message);
    }
    

}
