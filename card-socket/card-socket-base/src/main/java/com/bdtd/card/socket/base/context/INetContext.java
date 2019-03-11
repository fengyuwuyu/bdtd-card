package com.bdtd.card.socket.base.context;

import com.bdtd.card.socket.base.command.ICommand;

public interface INetContext {

	<T> void write(ICommand<T> command);

}
