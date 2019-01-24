package com.bdtd.card.common.log.internal;

import com.bdtd.card.common.log.EnumLogType;
import com.bdtd.card.common.log.LogLevel;

public class AttachTypeKey {
	EnumLogType type;
	LogLevel level;

	public AttachTypeKey() {
		super();
	}

	public AttachTypeKey(EnumLogType type, LogLevel level) {
		super();
		this.type = type;
		this.level = level;
	}

	public EnumLogType getType() {
		return type;
	}

	public void setType(EnumLogType type) {
		this.type = type;
	}

	public LogLevel getLevel() {
		return level;
	}

	public void setLevel(LogLevel level) {
		this.level = level;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((level == null) ? 0 : level.hashCode());
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
		AttachTypeKey other = (AttachTypeKey) obj;
		if (level != other.level)
			return false;
		if (type != other.type)
			return false;
		return true;
	}
}