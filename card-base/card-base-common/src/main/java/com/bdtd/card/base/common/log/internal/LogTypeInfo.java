package com.bdtd.card.base.common.log.internal;

import java.util.List;

import com.bdtd.card.base.common.log.EnumLogType;
import com.bdtd.card.base.common.log.LogLevel;

public class LogTypeInfo {
	// log type to create single folder
	private EnumLogType type;
	// if should create all.log in single folder
	private boolean outputAll;
	// if should create seperated log file for different log levels
	private List<LogLevel> additionalLogLevels;
	// if should skip logs in root log folder
	private boolean skipGlobalLogs;

	public LogTypeInfo(EnumLogType type, boolean outputAll, List<LogLevel> additionalLogLevels, boolean skipGlobalLogs) {
		super();
		this.type = type;
		this.outputAll = outputAll;
		this.additionalLogLevels = additionalLogLevels;
		this.skipGlobalLogs = skipGlobalLogs;
	}

	public EnumLogType getType() {
		return type;
	}

	public void setType(EnumLogType type) {
		this.type = type;
	}

	public boolean isOutputAll() {
		return outputAll;
	}

	public void setOutputAll(boolean outputAll) {
		this.outputAll = outputAll;
	}

	public List<LogLevel> getAdditionalLogLevels() {
		return additionalLogLevels;
	}

	public void setAdditionalLogLevels(List<LogLevel> additionalLogLevels) {
		this.additionalLogLevels = additionalLogLevels;
	}

	public boolean isSkipGlobalLogs() {
		return skipGlobalLogs;
	}

	public void setSkipGlobalLogs(boolean skipGlobalLogs) {
		this.skipGlobalLogs = skipGlobalLogs;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((additionalLogLevels == null) ? 0 : additionalLogLevels.hashCode());
		result = prime * result + (outputAll ? 1231 : 1237);
		result = prime * result + (skipGlobalLogs ? 1231 : 1237);
		result = prime * result + ((type == null) ? 0 : type.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LogTypeInfo other = (LogTypeInfo) obj;
		if (additionalLogLevels == null) {
			if (other.additionalLogLevels != null)
				return false;
		} else if (!additionalLogLevels.equals(other.additionalLogLevels))
			return false;
		if (outputAll != other.outputAll)
			return false;
		if (skipGlobalLogs != other.skipGlobalLogs)
			return false;
		if (type != other.type)
			return false;
		return true;
	}

}
