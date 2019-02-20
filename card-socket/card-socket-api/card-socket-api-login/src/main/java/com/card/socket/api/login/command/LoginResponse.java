package com.card.socket.api.login.command;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.annotation.Command;
import com.bdtd.card.socket.base.command.AbstractCommand;
import com.bdtd.card.socket.base.model.CommandCategory;

@Command(category=CommandCategory.REQUEST, commandId=1001, module=BdtdModule.LOGIN, couple=LoginRequest.class)
public class LoginResponse extends AbstractCommand<String> {

	

}
