package com.card.socket.api.login.command;

import com.bdtd.card.base.service.annotation.Command;
import com.bdtd.card.base.service.command.AbstractCommand;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.common.base.model.BdtdModule;
import com.card.socket.api.login.model.LoginType;

@Command(category=CommandCategory.REQUEST, commandId=1001, module=BdtdModule.LOGIN, couple=LoginResponse.class)
public class LoginRequest extends AbstractCommand {

	private int nodeId;
	private String passwd;
	private String token;
	private LoginType loginType;
}
