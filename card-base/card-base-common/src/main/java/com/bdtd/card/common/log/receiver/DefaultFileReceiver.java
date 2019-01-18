package com.bdtd.card.common.log.receiver;

import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.logging.log4j.Logger;

import com.bdtd.card.common.log.EnumLogType;
import com.bdtd.card.common.log.LogInfo;
import com.bdtd.card.common.log.LogLevel;
import com.bdtd.card.common.log.LogUtil;
import com.bdtd.card.common.log.internal.AttachTypeKey;
import com.bdtd.card.common.log.internal.Log4j2ConfigBuilder;
import com.bdtd.card.common.log.internal.LogTypeInfo;

public class DefaultFileReceiver extends AbstractLogReceiver {
	volatile Logger logger = Log4j2ConfigBuilder.getInstance().getLogger();
	volatile Logger errorLogger = Log4j2ConfigBuilder.getInstance().getLogger(LogLevel.ERROR);
	volatile Logger illegalUserLogger = Log4j2ConfigBuilder.getInstance().getLogger(EnumLogType.ILLEGAL_USER_ACTION);
	volatile Logger gcLoggingLogger = Log4j2ConfigBuilder.getInstance().getLogger(EnumLogType.GC_LOG);

	private ConcurrentHashMap<AttachTypeKey, Logger> attachTypeLoggers = new ConcurrentHashMap<>();
	private HashMap<EnumLogType, LogTypeInfo> typeInfos = new HashMap<>();
	protected AtomicBoolean started = new AtomicBoolean();

	@Override
	public void reconfigured() {
		logger = Log4j2ConfigBuilder.getInstance().getLogger();
		errorLogger = Log4j2ConfigBuilder.getInstance().getLogger(LogLevel.ERROR);
		illegalUserLogger = Log4j2ConfigBuilder.getInstance().getLogger(EnumLogType.ILLEGAL_USER_ACTION);
		gcLoggingLogger = Log4j2ConfigBuilder.getInstance().getLogger(EnumLogType.GC_LOG);
		attachTypeLoggers.clear();
	}

	@Override
	public void receive(LogInfo logInfo) {
		if (!started.get()) {
			return;
		}

		LogTypeInfo info = typeInfos.get(logInfo.getLogType());
		if (info != null) {
			if (info.isOutputAll()) {
				AttachTypeKey key = new AttachTypeKey(info.getType(), null);
				if (!attachTypeLoggers.containsKey(key)) {
					attachTypeLoggers.put(key, Log4j2ConfigBuilder.getInstance().getAttachedTypeLogger(info.getType()));
				}
				Logger logger = attachTypeLoggers.get(key);
				if (logger != null) {
					logger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
				}
			}

			for (LogLevel level : info.getAdditionalLogLevels()) {
				if (!logInfo.getLogLevel().isBiggerOrEqual(level)) {
					continue;
				}

				AttachTypeKey key = new AttachTypeKey(info.getType(), level);
				if (!attachTypeLoggers.containsKey(key)) {
					attachTypeLoggers.put(key, Log4j2ConfigBuilder.getInstance().getAttachedTypeLogger(info.getType(), level));
				}

				Logger logger = attachTypeLoggers.get(key);
				if (logger != null) {
					logger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
				}
			}

			if (info.isSkipGlobalLogs()) {
				return;
			}
		}

		logger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());

		if (logInfo.getLogLevel() == LogLevel.ERROR || logInfo.getLogLevel() == LogLevel.FATAL) {
			errorLogger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
		}

		if (logInfo.getLogType() == EnumLogType.ILLEGAL_USER_ACTION) {
			illegalUserLogger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
		}

		if (logInfo.getLogType() == EnumLogType.GC_LOG) {
			gcLoggingLogger.log(LogUtil.logLevelToLog4j(logInfo.getLogLevel()), logInfo.getDefaultFormattedMessage());
		}
	}

	/**
	 * add additional folder for single log type
	 * 
	 * @param type
	 *            additional log type
	 * @param outputAll
	 *            if we should output all.log in this single log folder
	 * @param additionalLevels
	 *            if we should output separated file for these log levels in
	 *            this single log folder
	 */
	public void attachLogType(EnumLogType type, boolean outputAll, List<LogLevel> additionalLevels) {
		attachLogType(type, outputAll, additionalLevels, false);
	}

	/**
	 * add additional folder for single log type
	 * 
	 * @param type
	 *            additional log type
	 * @param outputAll
	 *            if we should output all.log in this single log folder
	 * @param additionalLevels
	 *            if we should output separated file for these log levels in
	 *            this single log folder
	 * @param skipGlobalLogs
	 *            if we should skip global logs of this log type
	 */
	public void attachLogType(EnumLogType type, boolean outputAll, List<LogLevel> additionalLevels, boolean skipGlobalLogs) {
		synchronized (this) {
			LogTypeInfo info = new LogTypeInfo(type, outputAll, additionalLevels, skipGlobalLogs);
			typeInfos.put(type, info);
			Log4j2ConfigBuilder.getInstance().attachLogType(info);
		}
	}

	@Override
	public void start() {
		started.set(true);
	}

	@Override
	public void close() {
		started.set(false);
	}
}
