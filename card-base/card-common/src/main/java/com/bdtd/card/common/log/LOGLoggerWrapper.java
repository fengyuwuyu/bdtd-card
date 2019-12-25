package com.bdtd.card.common.log;

import org.slf4j.Logger;
import org.slf4j.Marker;
import org.slf4j.helpers.MessageFormatter;

import com.bdtd.card.common.base.model.EnumModule;

public class LOGLoggerWrapper implements Logger {
	
	private EnumModule module;
	
	public LOGLoggerWrapper(EnumModule module) {
		this.module = module;
	}

	@Override
	public String getName() {
		return "LOG";
	}

	@Override
	public boolean isTraceEnabled() {
		return LOG.haveReceiver(module, LogLevel.TRACE, EnumLogType.THIRD_PARTY);
	}

	@Override
	public boolean isTraceEnabled(Marker marker) {
		return LOG.haveReceiver(module, LogLevel.TRACE, EnumLogType.THIRD_PARTY);
	}

	@Override
	public void trace(String msg) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void trace(String format, Object arg) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void trace(String format, Object arg1, Object arg2) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void trace(String format, Object... argArray) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void trace(String msg, Throwable t) {
		LOG.trace(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void trace(Marker marker, String msg) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void trace(Marker marker, String format, Object arg) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void trace(Marker marker, String format, Object arg1, Object arg2) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void trace(Marker marker, String format, Object... argArray) {
		LOG.trace(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void trace(Marker marker, String msg, Throwable t) {
		LOG.trace(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public boolean isDebugEnabled() {
		return LOG.haveReceiver(module, LogLevel.DEBUG, EnumLogType.THIRD_PARTY);
	}

	@Override
	public boolean isDebugEnabled(Marker marker) {
		return LOG.haveReceiver(module, LogLevel.DEBUG, EnumLogType.THIRD_PARTY);
	}

	@Override
	public void debug(String msg) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void debug(String format, Object arg) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void debug(String format, Object arg1, Object arg2) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void debug(String format, Object... argArray) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void debug(String msg, Throwable t) {
		LOG.debug(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void debug(Marker marker, String msg) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void debug(Marker marker, String format, Object arg) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void debug(Marker marker, String format, Object arg1, Object arg2) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void debug(Marker marker, String format, Object... argArray) {
		LOG.debug(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void debug(Marker marker, String msg, Throwable t) {
		LOG.debug(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public boolean isInfoEnabled() {
		return LOG.haveReceiver(module, LogLevel.INFO, EnumLogType.THIRD_PARTY);
	}

	@Override
	public boolean isInfoEnabled(Marker marker) {
		return LOG.haveReceiver(module, LogLevel.INFO, EnumLogType.THIRD_PARTY);
	}

	@Override
	public void info(String msg) {
		LOG.info(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void info(String format, Object arg) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void info(String format, Object arg1, Object arg2) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void info(String format, Object... argArray) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void info(String msg, Throwable t) {
		LOG.info(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void info(Marker marker, String msg) {
		LOG.info(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void info(Marker marker, String format, Object arg) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void info(Marker marker, String format, Object arg1, Object arg2) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void info(Marker marker, String format, Object... argArray) {
		LOG.info(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void info(Marker marker, String msg, Throwable t) {
		LOG.info(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public boolean isWarnEnabled() {
		return LOG.haveReceiver(module, LogLevel.WARN, EnumLogType.THIRD_PARTY);
	}

	@Override
	public boolean isWarnEnabled(Marker marker) {
		return LOG.haveReceiver(module, LogLevel.WARN, EnumLogType.THIRD_PARTY);
	}

	@Override
	public void warn(String msg) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void warn(String format, Object arg) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void warn(String format, Object arg1, Object arg2) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void warn(String format, Object... argArray) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void warn(String msg, Throwable t) {
		LOG.warning(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void warn(Marker marker, String msg) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void warn(Marker marker, String format, Object arg) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void warn(Marker marker, String format, Object arg1, Object arg2) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void warn(Marker marker, String format, Object... argArray) {
		LOG.warning(module, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void warn(Marker marker, String msg, Throwable t) {
		LOG.warning(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public boolean isErrorEnabled() {
		return LOG.haveReceiver(module, LogLevel.ERROR, EnumLogType.THIRD_PARTY);
	}

	@Override
	public boolean isErrorEnabled(Marker marker) {
		return LOG.haveReceiver(module, LogLevel.ERROR, EnumLogType.THIRD_PARTY);
	}

	@Override
	public void error(String msg) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void error(String format, Object arg) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void error(String format, Object arg1, Object arg2) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void error(String format, Object... argArray) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void error(String msg, Throwable t) {
		LOG.error(module, t, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void error(Marker marker, String msg) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, msg);
	}

	@Override
	public void error(Marker marker, String format, Object arg) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg).getMessage());
	}

	@Override
	public void error(Marker marker, String format, Object arg1, Object arg2) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.format(format, arg1, arg2).getMessage());
	}

	@Override
	public void error(Marker marker, String format, Object... argArray) {
		LOG.error(module, null, EnumLogType.THIRD_PARTY, MessageFormatter.arrayFormat(format, argArray).getMessage());
	}

	@Override
	public void error(Marker marker, String msg, Throwable t) {
		LOG.error(module, t, EnumLogType.THIRD_PARTY, msg);
	}
}
