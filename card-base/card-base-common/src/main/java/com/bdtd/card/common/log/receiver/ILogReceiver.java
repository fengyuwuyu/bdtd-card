package com.bdtd.card.common.log.receiver;

import com.bdtd.card.common.log.LogInfo;

public interface ILogReceiver{
	void start();
	void close();
	void reconfigured();
	
	void receive(LogInfo logInfo);
}
