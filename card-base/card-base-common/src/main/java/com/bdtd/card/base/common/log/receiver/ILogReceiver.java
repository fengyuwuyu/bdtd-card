package com.bdtd.card.base.common.log.receiver;

import com.bdtd.card.base.common.log.LogInfo;

public interface ILogReceiver{
	void start();
	void close();
	void reconfigured();
	
	void receive(LogInfo logInfo);
}
