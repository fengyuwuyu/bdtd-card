package com.bdtd.card.base.service.exception;

import com.bdtd.card.common.base.annotation.Error;
import com.bdtd.card.common.base.exception.AbstractNoticeException;
import com.bdtd.card.common.base.model.BdtdError;


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
