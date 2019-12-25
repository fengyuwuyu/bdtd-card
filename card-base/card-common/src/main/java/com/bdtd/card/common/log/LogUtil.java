package com.bdtd.card.common.log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.logging.log4j.Level;

import com.bdtd.card.common.base.model.EnumError;
import com.bdtd.card.common.base.model.EnumModule;
import com.bdtd.card.common.util.DebugUtil;

public class LogUtil {

	public static Level logLevelToLog4j(LogLevel level) {
		switch (level) {
		case DEBUG:
			return Level.DEBUG;
		case INFO:
			return Level.INFO;
		case WARN:
			return Level.WARN;
		case ERROR:
			return Level.ERROR;
		case FATAL:
			return Level.FATAL;
		case TRACE:
			return Level.TRACE;
		default:
			return Level.ALL;
		}
	}

	public static LogLevel logLevelFromLog4j(Level level) {
		if (level == Level.DEBUG) {
			return LogLevel.DEBUG;
		} else if (level == Level.INFO) {
			return LogLevel.INFO;
		} else if (level == Level.WARN) {
			return LogLevel.WARN;
		} else if (level == Level.ERROR) {
			return LogLevel.ERROR;
		} else if (level == Level.TRACE) {
			return LogLevel.TRACE;
		} else if (level == Level.FATAL) {
			return LogLevel.FATAL;
		} else {
			return LogLevel.ALL;
		}
	}

	public static class PrettyPrintMap {
		private Map<?, ?> map;

		public PrettyPrintMap(Map<?, ?> map) {
			this.map = map;
		}

		@Override
		public String toString() {
			if (map.isEmpty()) {
				return "{}";
			}
			StringBuilder sb = new StringBuilder();
			sb.append('{').append(System.lineSeparator());
			for (Map.Entry<?, ?> entry : map.entrySet()) {
				sb.append('"').append(entry.getKey()).append('"').append(':').append(' ').append(entry.getValue())
						.append(',').append(System.lineSeparator());
			}
			sb.append('}').append(System.lineSeparator());

			return sb.toString();
		}
	}

	public static LogInfo formatLogInfo(boolean isDebug, Throwable exception, EnumError error, EnumModule module,
			EnumLogType logType, LogLevel logLevel, String format, Object... objs) {

		LogInfo info = new LogInfo(exception == null ? null : DebugUtil.exceptionStackTraceToString(exception), error,
				module, logType, logLevel, objs.length == 0 ? format : String.format(format, objs), new Date());

		return info.setDefaultFormattedMessage(LogUtil.defaultLogFormat(isDebug, info));
	}

	final static ThreadLocal<SimpleDateFormat> dateFormatter = new ThreadLocal<SimpleDateFormat>() {
		@Override
		protected SimpleDateFormat initialValue() {
			return new SimpleDateFormat("yyyy/MM/dd HH:mm:ss,SSS");
		};
	};

	final static char[] LOG_LEVEL_SIMPLE = { 'A', 'T', 'D', 'I', 'W', 'E', 'F', 'O' };

	public static String formatDate(Date date) {
		return dateFormatter.get().format(date);
	}

	public static String formatDate(long timestamp) {
		return dateFormatter.get().format(new Date(timestamp));
	}

	public static String defaultLogFormat(boolean isDebug, LogInfo info) {
		StringBuilder sb = new StringBuilder();

		String dateString = formatDate(info.getTimeStamp());
		sb.append(dateString);
		sb.append(' ');

		if (isDebug) {
			sb.append(getCallerString());
			sb.append(' ');
		}

		sb.append(String.format("[%s][%s] - %s", info.getModule().name(),
				LOG_LEVEL_SIMPLE[info.getLogLevel().getValue()], info.getLogMessage()));

		if (info.getError() != null) {
			sb.append('\n').append(info.getError());
		}

		if (info.getStackTrace() != null && info.getStackTrace().length() != 0) {
			sb.append('\n').append(info.getStackTrace());
		}
		return sb.toString();
	}

	private static String getCallerString() {
		StackTraceElement[] sts = Thread.currentThread().getStackTrace();
		for (int i = 1; i < sts.length; ++i) {
			StackTraceElement st = sts[i];
			if (st.getClassName().startsWith("net.vwvo.common.log")) {
				continue;
			}
			String f = st.getFileName();
			int l = st.getLineNumber();
			StringBuilder sb = new StringBuilder(f.length() + 10);
			sb.append('(').append(f).append(':').append(l).append(')');
			return sb.toString();
		}
		return "";
	}

	public static void main(String[] args) {
		System.out.println(getCallerString());
	}
}
