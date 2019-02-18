package com.card.socket.api.login;

import com.bdtd.card.base.service.server.IServer;
import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.annotation.InvokeClass;
import com.bdtd.card.socket.base.future.BdtdPromise;
import com.bdtd.card.socket.base.invoke.AbstractInvoke;


@InvokeClass(module=BdtdModule.LOGIN, name="LoginService", couple=LoginClient.class)
public class LoginServer extends AbstractInvoke implements IServer {

	public void login(String userName, String passwd, BdtdPromise promise) {
		
	}
}
