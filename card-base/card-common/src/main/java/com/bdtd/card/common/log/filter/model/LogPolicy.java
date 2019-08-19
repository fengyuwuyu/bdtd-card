package com.bdtd.card.common.log.filter.model;

import java.util.List;
import java.util.Map;

import com.bdtd.card.common.base.model.EnumModule;
import com.bdtd.card.common.log.EnumLogType;
import com.bdtd.card.common.log.LogLevel;
import com.bdtd.card.common.log.receiver.ILogReceiver;

public class LogPolicy {
	private List<Integer> moduleIds;
	private List<Integer> logTypes;
	private List<Integer> logLevels;
	private Map<String, List<String>> userFilters;
	private Map<Class<? extends ILogReceiver>, Boolean> recevierPolicies;

	private int priority;

	public boolean matchModule(EnumModule module) {
		return moduleIds == null || moduleIds.size() == 0 || (moduleIds.contains((int) module.getModuleId()));
	}

	public List<Integer> getModuleIds() {
		return moduleIds;
	}

	public void setModuleIds(List<Integer> moduleIds) {
		this.moduleIds = moduleIds;
	}

	public boolean matchLogType(EnumLogType logType) {
		return logTypes == null || logTypes.size() == 0 || (logTypes.contains((int) logType.getValue()));
	}

	public List<Integer> getLogTypes() {
		return logTypes;
	}

	public void setLogTypes(List<Integer> logTypes) {
		this.logTypes = logTypes;
	}

	public boolean matchLogLevel(LogLevel logLevel) {
		return logLevels == null || logLevels.size() == 0 || (logLevels.contains((int) logLevel.getValue()));
	}

	public List<Integer> getLogLevels() {
		return logLevels;
	}

	public void setLogLevels(List<Integer> logLevels) {
		this.logLevels = logLevels;
	}

	public boolean matchUserFilters(Map<String, String> userFilters) {
		if (this.userFilters == null || this.userFilters.size() == 0) {
			return true;
		}

		if (userFilters == null || userFilters.size() == 0) {
			return false;
		}

		for (Map.Entry<String, List<String>> entry : this.userFilters.entrySet()) {
			String exp = userFilters.get(entry.getKey());
			if (exp == null) {
				return false;
			}

			if (!entry.getValue().contains(exp)) {
				return false;
			}
		}

		return true;
	}

	public Map<String, List<String>> getUserFilters() {
		return userFilters;
	}

	public void setUserFilters(Map<String, List<String>> userFilters) {
		this.userFilters = userFilters;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public Map<Class<? extends ILogReceiver>, Boolean> getRecevierPolicies() {
		return recevierPolicies;
	}

	public void setRecevierPolicies(Map<Class<? extends ILogReceiver>, Boolean> recevierPolicies) {
		this.recevierPolicies = recevierPolicies;
	}

	public LogPolicy(List<Integer> moduleIds, List<Integer> logTypes, List<Integer> logLevels, Map<String, List<String>> userFilters,
			Map<Class<? extends ILogReceiver>, Boolean> recevierPolicies, int priority) {
		super();
		this.moduleIds = moduleIds;
		this.logTypes = logTypes;
		this.logLevels = logLevels;
		this.userFilters = userFilters;
		this.recevierPolicies = recevierPolicies;
		this.priority = priority;
	}

	public LogPolicy() {
	}

	@Override
	public String toString() {
		return "LogPolicy [moduleIds=" + moduleIds + ", logTypes=" + logTypes + ", logLevels=" + logLevels + ", userFilters=" + userFilters
				+ ", recevierPolicies=" + recevierPolicies + ", priority=" + priority + "]";
	}

}
