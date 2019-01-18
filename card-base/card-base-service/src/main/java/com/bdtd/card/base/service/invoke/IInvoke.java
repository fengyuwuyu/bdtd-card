package com.bdtd.card.base.service.invoke;

import com.bdtd.card.base.service.command.ICommand;
import com.bdtd.card.base.service.model.InvokeMetadata;

public interface IInvoke {

	void initMetadata();
	
	InvokeMetadata getMetadata();
	
	void invoke(ICommand command);
}
