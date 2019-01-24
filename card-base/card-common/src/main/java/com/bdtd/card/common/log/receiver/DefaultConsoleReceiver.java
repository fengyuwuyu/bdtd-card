package com.bdtd.card.common.log.receiver;

import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.logging.log4j.Logger;

import com.bdtd.card.common.log.LogInfo;
import com.bdtd.card.common.log.LogUtil;
import com.bdtd.card.common.log.internal.Log4j2ConfigBuilder;

public class DefaultConsoleReceiver extends AbstractLogReceiver {
	Logger logger = Log4j2ConfigBuilder.getInstance().getConsoleLogger();

	@Override
	public void receive(LogInfo logInfo) {
		if (!started.get()) {
			return;
		}
		logger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
	}

	protected AtomicBoolean started = new AtomicBoolean();

	@Override
	public void start() {
		started.set(true);
	}

	@Override
	public void close() {
		started.set(false);
	}
}
