package com.card.socket.api.login;

import com.bdtd.card.base.service.annotation.InvokeClass;
import com.bdtd.card.base.service.client.IClient;
import com.bdtd.card.base.service.invoke.AbstractInvoke;
import com.bdtd.card.common.base.model.BdtdModule;

@InvokeClass(module=BdtdModule.LOGIN, name="LoginService", couple=LoginServer.class)
public class LoginClient extends AbstractInvoke implements IClient {

	
}
