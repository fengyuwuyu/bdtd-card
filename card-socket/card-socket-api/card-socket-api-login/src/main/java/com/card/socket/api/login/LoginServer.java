package com.card.socket.api.login;

import com.bdtd.card.base.service.annotation.Command;
import com.bdtd.card.base.service.annotation.InvokeClass;
import com.bdtd.card.base.service.future.BdtdPromise;
import com.bdtd.card.base.service.invoke.AbstractInvoke;
import com.bdtd.card.base.service.model.CommandCategory;
import com.bdtd.card.base.service.server.IServer;
import com.bdtd.card.common.base.model.BdtdModule;


@InvokeClass(module=BdtdModule.LOGIN, name="LoginService", couple=LoginClient.class)
public class LoginServer extends AbstractInvoke implements IServer {

	public void login(String userName, String passwd, BdtdPromise promise) {
		
	}
}
