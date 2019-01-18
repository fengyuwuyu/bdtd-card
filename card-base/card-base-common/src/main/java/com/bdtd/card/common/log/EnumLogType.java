package com.bdtd.card.common.log;

import java.util.HashMap;
import java.util.Map;

import com.bdtd.card.common.exception.DuplicatedEnumIdException;

public enum EnumLogType {
	
	
	ILLEGAL_USER_ACTION((short) 1,"非法的用户操作"),
	MAYBE_ILLEGAL_USER_ACTION((short) 2, "有可能是非法的用户操作"),
	ILLEGAL_SERVICE_COMMUNICATION((short) 3,"服务器间交互错误"),
	SERVICE_ALARM_EXCEPTION((short) 4, "服务器内部严重问题"),
	INSIDE_BUG_EXCEPTION((short) 5, "服务内部bug"),
	MONEY((short) 6, "货币相关普通log"),
	MONEY_EXCEPTION((short) 7, "货币相关异常"),
	UNKNOW_EXCEPTION((short) 8, "遗漏的或者未知的异常"),
	RESOURCE_SERVICE_DEBUG((short) 9,"资源服务器debug日志"),
	TRANSACTION((short) 10,"事务日志"),
	NODE_NOTICE((short) 11, "服务器节点 需要关注log"),	
	SERVER_EFFICIENCY_DATA_RECORD((short) 22, "服务记录服务效率的数据"),
	EVENT_BOLT((short) 100, "event bolt"),
	EVENT_SPOUT((short) 101, "event spout"),
	TRANSACTION_BOLT((short) 102, "transaction bolt"),
	TRANSACTION_BOLT_EVENT_TRACE((short) 110, "transaction bolt event trace"),
	ALERT_COMPONENT((short) 201, "alarm component"),
	TRANSACTION_SPOUT((short) 103, "transaction spout"),
	ROOM_DB_DUMP((short) 200, "room data engine dump"),
	EVENT_LOGGER((short) 800, "event logger"),
	USER_COMMAND_TRACE((short) 900, "User command"),	
	RPC_COMMAND_TRACE((short) 901, "RPC command"),
	EVENT_TRACE((short) 902, "Event trace"),
	NOTIFICATION_TRACE((short) 903, "Notification trace"),
	GC_LOG((short) 998, "gc log"),
	GHOST((short) 999, "不会被log系统收集的log"),
	LOG_INTERAL((short) 1000, "log系统内部的log"),
	THIRD_PARTY((short) 1001, "第三方模块"),
	NORMAL((short) 0, "普通的log消息"),
	INVALID((short) -1, "Invalid enum log type");
	
	
	private short logType;
	private String desc;
	private EnumLogType(short logType,String desc){
		this.logType = logType;
		this.desc = desc;
	}
	public short getValue() {
		return logType;
	}

	public String getDesc() {
		return desc;
	}
	
	private final static Map<Short, EnumLogType> ENUM_MAP = new HashMap<>();

	static {
		registerErrorEnum(EnumLogType.values());
	}
	
	public static EnumLogType getLogType(short logType) {
		
		EnumLogType enm = ENUM_MAP.get(logType);
		if(enm == null){
			enm = EnumLogType.INVALID;
		}
		return enm;
	}
	
	public static void registerErrorEnum(EnumLogType[] enums) {
		if (enums != null) {
			for (EnumLogType enm : enums) {
				short key = enm.getValue();
				EnumLogType old = ENUM_MAP.put(key, enm);
				if(old != null) {
					throw new DuplicatedEnumIdException("重复的Log type:" + old.name());
				}
			}
		}
	}
}
