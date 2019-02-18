package com.card.socket.api.login;

import com.bdtd.card.base.service.client.IClient;
import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.annotation.InvokeClass;
import com.bdtd.card.socket.base.callback.AsyncCallback;
import com.bdtd.card.socket.base.invoke.AbstractInvoke;

@InvokeClass(module=BdtdModule.LOGIN, name="LoginService", couple=LoginServer.class)
public class LoginClient extends AbstractInvoke implements IClient {

	public void login(Integer nodeId, AsyncCallback<String> callback) {
		
	}
}
