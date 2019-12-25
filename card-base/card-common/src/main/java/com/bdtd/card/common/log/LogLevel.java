package com.bdtd.card.common.log;

import java.util.HashMap;
import java.util.Map;

import com.bdtd.card.common.base.model.EnumModule;
import com.bdtd.card.common.exception.DuplicatedEnumIdException;

public enum LogLevel {
	ALL((short) 0),
	TRACE((short) 1),
	DEBUG((short) 2),
	INFO((short) 3),
	WARN((short) 4),
	ERROR((short) 5),
	FATAL((short) 6),
	OFF((short) 7);
	
	private short value;
	LogLevel(short value) {
		this.value = value;
	}
	
	public boolean isBiggerOrEqual(LogLevel other) {
		return value >= other.getValue();
	}
	
	public int getValue() {
		return value;
	}
	private final static Map<Integer, LogLevel> ENUM_MAP = new HashMap<>();

	static {
		registerErrorEnum(LogLevel.values());
	}
	
	public static LogLevel getLogType(int logType) {
		
		LogLevel enm = ENUM_MAP.get(logType);
		if(enm == null){
			enm = LogLevel.ALL;
		}
		return enm;
	}
	
	public static void registerErrorEnum(LogLevel[] enums) {
		if (enums != null) {
			for (LogLevel enm : enums) {
				int key = enm.getValue();
				LogLevel old = ENUM_MAP.put(key, enm);
				if(old != null) {
					LOG.fatal(EnumModule.COMMON, new DuplicatedEnumIdException("重复的Log type:" + old.name()), "");
					throw new DuplicatedEnumIdException("重复的Log type:" + old.name());
				}
			}
		}
	}
}
