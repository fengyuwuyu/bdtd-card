package com.bdtd.card.base.common.log;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.logging.log4j.core.LoggerContext;
import org.slf4j.LoggerFactory;

import com.bdtd.card.base.common.base.exception.AbstractNoticeException;
import com.bdtd.card.base.common.base.model.BdtdError;
import com.bdtd.card.base.common.base.model.BdtdModule;
import com.bdtd.card.base.common.log.filter.LogFilter;
import com.bdtd.card.base.common.log.filter.model.LogPolicy;
import com.bdtd.card.base.common.log.internal.Log4j2ConfigBuilder;
import com.bdtd.card.base.common.log.receiver.AbstractLogReceiver;
import com.bdtd.card.base.common.log.receiver.DefaultConsoleReceiver;
import com.bdtd.card.base.common.log.receiver.DefaultFileReceiver;
import com.bdtd.card.base.common.log.receiver.ILogReceiver;
import com.bdtd.card.base.common.util.CollectionUtil;
import com.bdtd.card.base.common.util.FileUtil;
import com.bdtd.card.base.common.util.StringUtil;

public class LOG {
	private final static Object CONFIGURE_LOCK = new Object();
	public static final EnumLogType DEFAULT_LOG_TYPE = EnumLogType.NORMAL;
	private final static ConcurrentHashMap<String, AbstractLogReceiver> RECEIVER_MAP = CollectionUtil
			.createConcurrentHashMap();
	private static List<String> currentLogFolder = new ArrayList<>();
	private static Boolean debugOutput = null;

	private static String getAbsLogFolder(String folder) {
		if (StringUtil.isNullEmpty(folder)) {
			folder = System.getProperty("sun.java.command");
			if (folder.indexOf("apache") != -1) {
				folder = "logs/tomcat_logs_" + System.currentTimeMillis();
			} else {

				int slashIndex = folder.lastIndexOf('/');
				if (slashIndex != -1) {
					folder = folder.substring(slashIndex + 1, folder.length());
				}

				slashIndex = folder.lastIndexOf('\\');
				if (slashIndex != -1) {
					folder = folder.substring(slashIndex + 1, folder.length());
				}

				int spaceIndex = folder.indexOf(' ');
				if (spaceIndex != -1) {
					folder = folder.substring(0, spaceIndex);
				}

				if (folder.isEmpty()) {
					folder = "logs/vwvo_" + System.currentTimeMillis();
				} else {
					folder = "logs/" + folder;
				}

				folder = folder.replace('.', '_');
			}
		}
		return FileUtil.getAbsolutePathRelated(".", folder);
	}

	private static void refreshLog4j(List<String> newAbsFolder) {
		try {

			File fakeLog4jConfig = File.createTempFile("log4j", ".tmp");

			FileWriter fileWriter = null;
			fileWriter = new FileWriter(fakeLog4jConfig, true);
			fileWriter.write(getLog4jConfigString(newAbsFolder));
			fileWriter.close();
			// Configurator.initialize("test",
			// fakeLog4jConfig.getAbsolutePath());
			System.setProperty("log4j.configurationFile", fakeLog4jConfig.getAbsolutePath());
			LoggerContext.getContext(false).reconfigure();
			fakeLog4jConfig.delete();
		} catch (Throwable e) {
			LOG.fatal(BdtdModule.COMMON, e, "Failed to reconfigure log4j.");
		}
	}

	public static void setDebug(boolean debug) {
		debugOutput = debug;
	}

	private static boolean isDebug() {
		if (debugOutput == null) {
			debugOutput = java.lang.management.ManagementFactory.getRuntimeMXBean().getInputArguments().toString()
					.indexOf("-agentlib:jdwp") > 0;
		}

		return debugOutput;
	}

	private static String getLog4jConfigString(List<String> folder) {
		String str = Log4j2ConfigBuilder.getInstance().setLogFolders(folder).build();
		// System.out.println(str);
		return str;
	}

	private static final String STATIC_LOGGER_BINDER_PATH = "org/slf4j/impl/StaticLoggerBinder.class";

	private static final Set<URL> getPossibleSLF4JStaticBindings() {
		Set<URL> staticLoggerBinderPathSet = new LinkedHashSet<URL>();
		try {
			ClassLoader loggerFactoryClassLoader = LoggerFactory.class.getClassLoader();
			Enumeration<URL> paths;
			if (loggerFactoryClassLoader == null) {
				paths = ClassLoader.getSystemResources(STATIC_LOGGER_BINDER_PATH);
			} else {
				paths = loggerFactoryClassLoader.getResources(STATIC_LOGGER_BINDER_PATH);
			}
			while (paths.hasMoreElements()) {
				URL path = paths.nextElement();
				staticLoggerBinderPathSet.add(path);
			}
		} catch (IOException e) {
			LOG.warning(BdtdModule.COMMON, e, "Error getting resources from path %s", STATIC_LOGGER_BINDER_PATH);
		}
		return staticLoggerBinderPathSet;
	}

	private static LogFilter LOG_FILTER = new LogFilter();
	static {
		try {
			String logFolder = getAbsLogFolder(null);

			refreshLog4j(Arrays.asList(logFolder));

			DefaultFileReceiver defaultFileReceiver = new DefaultFileReceiver();
			defaultFileReceiver.start();
			DefaultConsoleReceiver defaultConsoleReceiver = new DefaultConsoleReceiver();
			defaultConsoleReceiver.start();
			registerReceiver(defaultFileReceiver);
			registerReceiver(defaultConsoleReceiver);

			Map<Class<? extends ILogReceiver>, Boolean> recevierPolicies = new HashMap<>();
			recevierPolicies.put(DefaultConsoleReceiver.class, true);
			recevierPolicies.put(DefaultFileReceiver.class, true);

			LogPolicy logPolicy = new LogPolicy(null, null, null, null, recevierPolicies, 0);
			List<LogPolicy> logPolicies = new ArrayList<>();
			logPolicies.add(logPolicy);

			LOG_FILTER.setPolicies(logPolicies);

			Set<URL> slf4jBindings = getPossibleSLF4JStaticBindings();
			if (slf4jBindings.size() != 1) {
				LOG.error(BdtdModule.COMMON, null,
						"more than one or no slf4j static bindings were found, third party logs may not be logged.");
				for (URL url : slf4jBindings) {
					LOG.error(BdtdModule.COMMON, null, "binding: [%s]", url);
				}
			}
		} catch (Throwable e) {
			LOG.fatal(BdtdModule.COMMON, e, "Failed to initialize log system.");
		}
	}

	public static void reconfigure() {
		reconfigure(currentLogFolder, null);
	}

	public static void reconfigure(String logFolder) {
		reconfigure(logFolder, null);
	}

	public static void reconfigure(List<LogPolicy> logPolicies) {
		reconfigure((List<String>) null, logPolicies);
	}

	public static void reconfigure(String logFolder, List<LogPolicy> logPolicies) {
		if (logFolder == null) {
			reconfigure((List<String>) null, logPolicies);
		} else {
			reconfigure(Arrays.asList(logFolder), logPolicies);
		}
	}

	public static void reconfigure(List<String> logFolders, List<LogPolicy> logPolicies) {

		synchronized (CONFIGURE_LOCK) {

			try {
				if (logFolders != null) {
					for (int i = 0; i < logFolders.size(); ++i) {
						logFolders.set(i, getAbsLogFolder(logFolders.get(i)));
					}
					refreshLog4j(logFolders);
					currentLogFolder = logFolders;
				}

				if (logPolicies != null) {
					LOG_FILTER.setPolicies(logPolicies);
				}

				for (ILogReceiver receiver : RECEIVER_MAP.values()) {
					receiver.reconfigured();
				}

			} catch (Throwable e) {
				LOG.fatal(BdtdModule.COMMON, e, "Failed to reconfigure log system.");
			}
		}
	}

	public static void trace(BdtdModule module, String format, Object... objs) {
		try {
			trace(module, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void trace(BdtdModule module, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, null, module, logType, LogLevel.TRACE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void trace(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			trace(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void trace(BdtdModule module, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.TRACE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void trace(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			trace(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void trace(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.TRACE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdModule module, String format, Object... objs) {
		try {
			debug(module, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdModule module, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, null, module, logType, LogLevel.DEBUG, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			debug(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdModule module, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.DEBUG, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			debug(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.DEBUG, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdError error, String format, Object... objs) {
		try {
			debug(error, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(BdtdError error, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, error, error.getModule(), logType, LogLevel.DEBUG, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(AbstractNoticeException exception, String format, Object... objs) {
		try {
			debug(exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void debug(AbstractNoticeException exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, exception.getErrorCode(), exception.getErrorCode().getModule(), logType, LogLevel.DEBUG,
					format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdModule module, String format, Object... objs) {
		try {
			info(module, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdModule module, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, null, module, logType, LogLevel.INFO, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			info(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdModule module, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.INFO, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			info(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.INFO, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdError error, String format, Object... objs) {
		try {
			info(error, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(BdtdError error, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, error, error.getModule(), logType, LogLevel.INFO, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(AbstractNoticeException exception, String format, Object... objs) {
		try {
			info(exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void info(AbstractNoticeException exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, exception.getErrorCode(), exception.getErrorCode().getModule(), logType, LogLevel.INFO,
					format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdModule module, String format, Object... objs) {
		try {
			warning(module, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdModule module, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, null, module, logType, LogLevel.WARN, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			warning(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdModule module, Throwable exception, EnumLogType logType, String format,
			Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.WARN, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			warning(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.WARN, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdError error, String format, Object... objs) {
		try {
			warning(error, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(BdtdError error, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, error, error.getModule(), logType, LogLevel.WARN, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(AbstractNoticeException exception, String format, Object... objs) {
		try {
			warning(exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void warning(AbstractNoticeException exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, exception.getErrorCode(), exception.getErrorCode().getModule(), logType, LogLevel.WARN,
					format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			error(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdModule module, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.ERROR, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			error(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.ERROR, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdError error, String format, Object... objs) {
		try {
			error(error, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(BdtdError error, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, error, error.getModule(), logType, LogLevel.ERROR, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(AbstractNoticeException exception, String format, Object... objs) {
		try {
			error(exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void error(AbstractNoticeException exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, exception.getErrorCode(), exception.getErrorCode().getModule(), logType, LogLevel.ERROR,
					format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdModule module, Throwable exception, String format, Object... objs) {
		try {
			fatal(module, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdModule module, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, null, module, logType, LogLevel.FATAL, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdError error, Throwable exception, String format, Object... objs) {
		try {
			fatal(error, exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdError error, Throwable exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, error, error.getModule(), logType, LogLevel.FATAL, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdError error, String format, Object... objs) {
		try {
			fatal(error, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(BdtdError error, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(null, error, error.getModule(), logType, LogLevel.FATAL, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(AbstractNoticeException exception, String format, Object... objs) {
		try {
			fatal(exception, DEFAULT_LOG_TYPE, format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	public static void fatal(AbstractNoticeException exception, EnumLogType logType, String format, Object... objs) {
		try {
			dispatch(exception, exception.getErrorCode(), exception.getErrorCode().getModule(), logType, LogLevel.FATAL,
					format, objs);
		} catch (Throwable e) {
			warning(BdtdModule.UNDEFINE, e, EnumLogType.LOG_INTERAL, "Failed to send log.");
		}
	}

	private static void dispatch(Throwable exception, BdtdError error, BdtdModule module, EnumLogType logType,
			LogLevel logLevel, String format, Object... objs) {

		try {
			if (module == null) {
				throw new IllegalArgumentException("EnumBdtdModule should not be null.");
			}

			if (logType == null) {
				throw new IllegalArgumentException("Log type should not be null.");
			}

			if (format == null) {
				format = "";
			}

			Set<ILogReceiver> logReceivers = LOG_FILTER.getLogReceivers(module, logLevel, logType);

			if (logReceivers.size() == 0) {
				return;
			}

			LogInfo logInfo = LogUtil.formatLogInfo(isDebug(), exception, error, module, logType, logLevel, format,
					objs);

			for (ILogReceiver receiver : logReceivers) {
				try {
					receiver.receive(logInfo);
				} catch (Throwable e) {
					if (logType != EnumLogType.LOG_INTERAL) {
						LOG.warning(BdtdModule.COMMON, e, EnumLogType.LOG_INTERAL, "Failed to send to receiver [%s]",
								receiver);
					}
				}
			}
		} catch (Throwable e) {
			if (logType != EnumLogType.LOG_INTERAL) {
				throw e;
			}
		}
	}

	public static void registerReceiver(AbstractLogReceiver reciever) {
		RECEIVER_MAP.put(reciever.getClass().getName(), reciever);
	}

	@SuppressWarnings("unchecked")
	public static <T extends ILogReceiver> T getReceiver(Class<T> receiver) {
		return (T) RECEIVER_MAP.get(receiver.getName());
	}

	public static Set<ILogReceiver> getReceivers() {
		return new HashSet<>(RECEIVER_MAP.values());
	}

	public static void removeReceiver(Class<?> t) {
		RECEIVER_MAP.remove(t.getName());
	}

	public static LogFilter getLogFilter() {
		return LOG_FILTER;
	}

	public static boolean haveReceiver(BdtdModule module, LogLevel logLevel, EnumLogType logType) {
		return LOG_FILTER.getLogReceivers(module, logLevel, logType).size() != 0;
	}
	
}
