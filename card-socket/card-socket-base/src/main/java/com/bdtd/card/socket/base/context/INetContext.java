package com.bdtd.card.socket.base.context;

import com.bdtd.card.socket.base.command.ICommand;

public interface INetContext {

	void write(ICommand command);

}
