package com.card.socket.api.login;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.annotation.InvokeClass;
import com.bdtd.card.socket.base.invoke.AbstractServerInvoke;
import com.bdtd.card.socket.base.promise.BdtdPromise;


@InvokeClass(module=BdtdModule.LOGIN, name="LoginService", couple=LoginClient.class)
public class LoginServer extends AbstractServerInvoke {

	public void login(BdtdPromise<String> promise, Integer nodeId) {
		
	}
}
