package com.bdtd.card.socket.base.model;

import java.util.List;

import com.bdtd.card.common.base.model.BdtdModule;
import com.bdtd.card.socket.base.invoke.IInvoke;

public class InvokeMetadata {
	private Class<? extends IInvoke> invokerClass;
	private List<MethodCommand> methodCommandList;
	private BdtdModule module;
	private Class<? extends IInvoke> couple;
	public Class<? extends IInvoke> getInvokerClass() {
		return invokerClass;
	}
	public void setInvokerClass(Class<? extends IInvoke> invokerClass) {
		this.invokerClass = invokerClass;
	}
	public List<MethodCommand> getMethodCommandList() {
		return methodCommandList;
	}
	public void setMethodCommandList(List<MethodCommand> methodCommandList) {
		this.methodCommandList = methodCommandList;
	}
	public BdtdModule getModule() {
		return module;
	}
	public void setModule(BdtdModule module) {
		this.module = module;
	}
	public Class<? extends IInvoke> getCouple() {
		return couple;
	}
	public void setCouple(Class<? extends IInvoke> couple) {
		this.couple = couple;
	}
	
}
