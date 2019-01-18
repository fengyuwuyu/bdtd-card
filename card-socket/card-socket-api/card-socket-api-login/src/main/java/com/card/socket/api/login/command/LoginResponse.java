package com.card.socket.api.login.command;

import com.bdtd.card.base.service.annotation.Command;
import com.bdtd.card.base.service.command.AbstractCommand;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.common.base.model.BdtdModule;

@Command(category=CommandCategory.REQUEST, commandId=1001, module=BdtdModule.LOGIN, couple=LoginRequest.class)
public class LoginResponse extends AbstractCommand {


}
