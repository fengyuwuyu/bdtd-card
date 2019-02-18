package com.bdtd.card.socket.base.utils;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

public class SequenceIdUtil {
	
	private static final ConcurrentHashMap<Long, AtomicInteger> COUNTER_MAP = new ConcurrentHashMap<>();

	public static int generatorId(int moduleId, int commandId) {
		Long key = getKey(moduleId, commandId);
		return COUNTER_MAP.getOrDefault(key, new AtomicInteger(1)).get();
	}
	
	public static Long getKey(int moduleId, int commandId) {
		return (Long.valueOf(moduleId) & 0xffffffff) << 32 | (commandId & 0xffffffff);
	}
	
	public static int getModuleId(long key) {
		return (int)(key >> 32 & 0xfffffff);
	}
	
	public static int getCommandId(long key) {
		return (int)(key & 0xfffffff);
	}
	

}
