package com.bdtd.card.common.log.filter;

import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.bdtd.card.common.base.model.EnumModule;
import com.bdtd.card.common.log.EnumLogType;
import com.bdtd.card.common.log.LOG;
import com.bdtd.card.common.log.LogLevel;
import com.bdtd.card.common.log.filter.model.LogPolicy;
import com.bdtd.card.common.log.filter.model.LogThreadCache;
import com.bdtd.card.common.log.receiver.ILogReceiver;


public class LogFilter {

	private TreeMap<Integer, LogPolicy> policiesMap = null;
	private List<LogPolicy> policies;
	private ThreadLocal<LogThreadCache> threadLocal;
	private AtomicInteger version;
	private HashMap<Class<? extends ILogReceiver>, Long> logReceiverIdentifierMap;

	public LogFilter() {
		version = new AtomicInteger(0);
		threadLocal = new ThreadLocal<LogThreadCache>() {
			@Override
			protected LogThreadCache initialValue() {
				return new LogThreadCache();
			}
		};

		logReceiverIdentifierMap = new HashMap<>();

		policiesMap = new TreeMap<Integer, LogPolicy>(new Comparator<Integer>() {
			@Override
			public int compare(Integer o1, Integer o2) {
				return o1 - o2;
			}
		});
	}

	public List<LogPolicy> getPolicies() {
		synchronized (this) {
			return policies;
		}
	}

	public void setPolicies(List<LogPolicy> policies) {
		synchronized (this) {
			LOG.warning(EnumModule.COMMON, "Reconfiguring log filter: %s, version: %s", policies, version.get());
			Map<Class<? extends ILogReceiver>, Long> newLogReceiverIdentifierMap = new HashMap<>();
			TreeMap<Integer, LogPolicy> newPolicyMap = new TreeMap<>();

			Set<Class<? extends ILogReceiver>> receivers = new HashSet<>();
			for (LogPolicy policy : policies) {
				newPolicyMap.put(policy.getPriority(), policy);

				receivers.addAll(policy.getRecevierPolicies().keySet());
			}

			if (receivers.size() > 64) {
				throw new IllegalArgumentException("Max receivers is 64");
			}

			long identifier = 1L;
			for (Class<? extends ILogReceiver> receiverClass : receivers) {

				if (LOG.getReceiver(receiverClass) == null) {
					LOG.warning(EnumModule.COMMON, "Log receiver [%s] is not exist, ignore.", receiverClass.getName());
					continue;
				}

				newLogReceiverIdentifierMap.put(receiverClass, identifier);

				identifier *= 2;
			}

			logReceiverIdentifierMap.clear();
			logReceiverIdentifierMap.putAll(newLogReceiverIdentifierMap);

			policiesMap.clear();
			policiesMap.putAll(newPolicyMap);
			this.policies = policies;
			LOG.warning(EnumModule.COMMON, "Reconfiguring log filter finished, version: %s", version.incrementAndGet());
		}
	}

	long makeKey(EnumModule module, LogLevel logLevel, EnumLogType logType) {
		return ((long) module.getModuleId()) + (((long) logLevel.getValue()) << 16)
				+ (((long) logType.getValue()) << 32);
	}

	public Set<ILogReceiver> getLogReceivers(EnumModule module, LogLevel logLevel, EnumLogType logType) {
		LogThreadCache threadCache = threadLocal.get();
		Map<Long, Set<ILogReceiver>> logReceiverSetCacheByMask = threadCache.getLogReceiverSetCacheByMask();
		Map<Long, Set<ILogReceiver>> logReceiverSetCacheByKey = threadCache.getLogReceiverSetCacheByKey();
		int currentVersion = version.get();
		if (currentVersion != threadCache.getVersion()) {
			logReceiverSetCacheByMask.clear();
			logReceiverSetCacheByKey.clear();
			threadCache.setVersion(currentVersion);
		}
		Long key = makeKey(module, logLevel, logType);
		Set<ILogReceiver> cache = logReceiverSetCacheByKey.get(key);
		if (cache != null) {
			return cache;
		}

		Long receiverMask = -1L;
		synchronized (this) {
			for (LogPolicy logPolicy : policiesMap.values()) {
				// match module id.
				if (!logPolicy.matchModule(module)) {
					continue;
				}

				if (!logPolicy.matchLogLevel(logLevel)) {
					continue;
				}

				if (!logPolicy.matchLogType(logType)) {
					continue;
				}

				for (Map.Entry<Class<? extends ILogReceiver>, Boolean> entry : logPolicy.getRecevierPolicies()
						.entrySet()) {

					Long identifier = logReceiverIdentifierMap.get(entry.getKey());
					if (identifier == null) {
						continue;
					}
					if (entry.getValue()) {
						receiverMask |= identifier;
					} else {
						receiverMask &= ~identifier;
					}
				}
			}
		}
		Set<ILogReceiver> receivers = logReceiverSetCacheByMask.get(receiverMask);
		if (receivers == null) {

			receivers = new HashSet<>();

			synchronized (this) {
				for (Map.Entry<Class<? extends ILogReceiver>, Long> entry : logReceiverIdentifierMap.entrySet()) {
					if ((entry.getValue() & receiverMask) != 0L) {
						ILogReceiver receiver = LOG.getReceiver(entry.getKey());

						if (receiver == null) {
						} else {
							receivers.add(receiver);
						}
					}
				}
			}

			logReceiverSetCacheByMask.put(receiverMask, receivers);
			if (key != null) {
				logReceiverSetCacheByKey.put(key, receivers);
			}
		}

		return receivers;
	}

}
