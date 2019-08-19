package com.bdtd.card.common.log;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.bdtd.card.common.base.model.EnumError;
import com.bdtd.card.common.base.model.EnumModule;
import com.bdtd.card.common.log.protobuf.PBLog.PBKeyValuePair;
import com.bdtd.card.common.log.protobuf.PBLog.PBLogInfo;
import com.bdtd.card.common.util.StringUtil;

public class LogInfo {
	private Integer nodeId;
	private EnumModule module;
	private EnumLogType logType;
	private LogLevel logLevel;
	private String logMessage;
	private String stackTrace;
	private EnumError error;
	private Date timeStamp;
	private String defaultFormattedMessage;

	public LogInfo(String stackTrace, EnumError err, EnumModule module, EnumLogType logType, LogLevel logLevel,
			String logMessage, Date timeStamp) {
		this.logType = logType;
		this.logLevel = logLevel;
		this.logMessage = logMessage;
		this.stackTrace = stackTrace == null ? StringUtil.EMPTY : stackTrace;
		this.error = err;
		this.module = module;
		this.timeStamp = timeStamp;
	}

	public Integer getNodeId() {
		return nodeId;
	}

	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}

	public String getStackTrace() {
		return stackTrace;
	}

	public EnumError getError() {
		return error;
	}

	public EnumModule getModule() {
		return module;
	}

	public EnumLogType getLogType() {
		return logType;
	}

	public LogLevel getLogLevel() {
		return logLevel;
	}

	public String getLogMessage() {
		return logMessage;
	}

	public Date getTimeStamp() {
		return timeStamp;
	}

	public String getDefaultFormattedMessage() {
		return defaultFormattedMessage;
	}

	public LogInfo setDefaultFormattedMessage(String defaultFormattedMessage) {
		this.defaultFormattedMessage = defaultFormattedMessage;
		return this;
	}

	public byte[] toBytes() {

		PBLogInfo info = PBLogInfo.newBuilder()
				.setDefaultFormattedMessage(getDefaultFormattedMessage())
				.setErrorCode(getError() == null ? 0 : getError().getErrorCode())
				.setException(getStackTrace())
				.setLogLevel(getLogLevel().getValue())
				.setLogMessage(getLogMessage())
				.setLogType(getLogType().getValue())
				.setModuleId(getModule().getModuleId())
				.setTimeStamp(getTimeStamp().getTime())
				.setNodeId(getNodeId())
				.build();

		return info.toByteArray();
	}

	static public LogInfo fromBytes(byte[] bytes) {
		try {
			PBLogInfo info = PBLogInfo.parseFrom(bytes);

			Map<String, String> userDefinedObjects = new HashMap<>();
			for (PBKeyValuePair keyValuePair : info.getUserValuesList()) {
				userDefinedObjects.put(keyValuePair.getKey(), keyValuePair.getValue());
			}

			LogInfo info2 = new LogInfo(info.getException(), EnumError.getError(info.getErrorCode()),
					EnumModule.getModule(info.getModuleId()), EnumLogType.getLogType((short) info.getLogType()),
					LogLevel.getLogType(info.getLogLevel()), info.getLogMessage(), new Date(info.getTimeStamp()));

			info2.setDefaultFormattedMessage(info.getDefaultFormattedMessage());
			info2.setNodeId(info.getNodeId());

			return info2;
		} catch (Exception e) {	
			return null;
		}
	}

}
