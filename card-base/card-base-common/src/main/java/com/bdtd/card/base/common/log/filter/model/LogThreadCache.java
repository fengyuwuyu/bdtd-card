package com.bdtd.card.base.common.log.filter.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.bdtd.card.base.common.log.receiver.ILogReceiver;

public class LogThreadCache {
	private Map<Long, Set<ILogReceiver>> logReceiverSetCacheByMask;
	private Map<Long, Set<ILogReceiver>> logReceiverSetCacheByKey;
	private int version;

	public Map<Long, Set<ILogReceiver>> getLogReceiverSetCacheByMask() {
		return logReceiverSetCacheByMask;
	}

	public void setLogReceiverSetCacheByMask(Map<Long, Set<ILogReceiver>> logReceiverSetCacheByMask) {
		this.logReceiverSetCacheByMask = logReceiverSetCacheByMask;
	}

	public Map<Long, Set<ILogReceiver>> getLogReceiverSetCacheByKey() {
		return logReceiverSetCacheByKey;
	}

	public void setLogReceiverSetCacheByKey(Map<Long, Set<ILogReceiver>> logReceiverSetCacheByKey) {
		this.logReceiverSetCacheByKey = logReceiverSetCacheByKey;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public LogThreadCache() {
		super();
		this.logReceiverSetCacheByKey = new HashMap<>();
		this.logReceiverSetCacheByMask = new HashMap<>();
	}
}
