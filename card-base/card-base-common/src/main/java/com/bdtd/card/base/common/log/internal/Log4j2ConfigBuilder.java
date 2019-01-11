package com.bdtd.card.base.common.log.internal;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.bdtd.card.base.common.log.EnumLogType;
import com.bdtd.card.base.common.log.LogLevel;

/**
 * contains one console logger several default file logger several log type
 * logger
 * 
 * @author jim
 *
 */
public class Log4j2ConfigBuilder {

	static Log4j2ConfigBuilder INSTANCE = new Log4j2ConfigBuilder();

	private Log4j2ConfigBuilder() {
		attachedLogTypes = new HashSet<>();
	}

	public static Log4j2ConfigBuilder getInstance() {
		return INSTANCE;
	}

	volatile List<String> logFolders;

	public Log4j2ConfigBuilder setLogFolders(List<String> logFolders) {
		this.logFolders = logFolders;
		return this;
	}

	HashSet<LogTypeInfo> attachedLogTypes;

	public Log4j2ConfigBuilder attachLogType(LogTypeInfo info) {
		attachedLogTypes.add(info);
		return this;
	}

	public String build() {
		Document document = DocumentHelper.createDocument();
		Element root = document.addElement("configuration");
		root.addAttribute("debug", "off");

		Element appenders = root.addElement("Appenders");

		{
			// std out
			Element appender = appenders.addElement("Console");
			appender.addAttribute("name", "StdoutAppender");
			appender.addAttribute("target", "SYSTEM_OUT");

			Element filters = appender.addElement("Filters");
			addThresholdFilter(filters, "fatal", "DENY", "NEUTRAL");
			addThresholdFilter(filters, "error", "DENY", "ACCEPT");

			addPatternLayout(appender);
		}
		{
			// std err
			Element appender = appenders.addElement("Console");
			appender.addAttribute("name", "StderrAppender");
			appender.addAttribute("target", "SYSTEM_ERR");

			Element filters = appender.addElement("Filters");

			addThresholdFilter(filters, "fatal", "ACCEPT", "NEUTRAL");
			addThresholdFilter(filters, "error", "ACCEPT", "DENY");

			addPatternLayout(appender);
		}
		{
			// null
			Element appender = appenders.addElement("Console");
			appender.addAttribute("name", "NullAppender");
			appender.addAttribute("target", "SYSTEM_OUT");

			Element filters = appender.addElement("Filters");

			addThresholdFilter(filters, "trace", "DENY", "DENY");
			addThresholdFilter(filters, "debug", "ACCEPT", "DENY");
			addThresholdFilter(filters, "info", "DENY", "DENY");
			addThresholdFilter(filters, "warning", "ACCEPT", "DENY");
			addThresholdFilter(filters, "error", "ACCEPT", "DENY");
			addThresholdFilter(filters, "fatal", "DENY", "DENY");

			addPatternLayout(appender);
		}

		addRollingFileAppenders(appenders, null, true, Arrays.asList(LogLevel.ERROR),
				Arrays.asList(EnumLogType.ILLEGAL_USER_ACTION, EnumLogType.GC_LOG));
		{
			for (LogTypeInfo info : attachedLogTypes) {
				addRollingFileAppenders(appenders, info.getType(), info.isOutputAll(), info.getAdditionalLogLevels(),
						new ArrayList<>());
			}
		}

		Element loggers = root.addElement("Loggers");
		{
			{
				Element logger = loggers.addElement("root").addAttribute("level", "all");
				logger.addElement("appender-ref").addAttribute("ref", "NullAppender");
			}
			{
				Element logger = loggers.addElement("logger").addAttribute("level", "all")
						.addAttribute("additivity", "false").addAttribute("name", "DefaultConsoleLogger");
				logger.addElement("appender-ref").addAttribute("ref", "StdoutAppender");
				logger.addElement("appender-ref").addAttribute("ref", "StderrAppender");
			}

			addLogger(loggers, null);
			addLogger(loggers, null, LogLevel.ERROR);
			addLogger(loggers, null, EnumLogType.ILLEGAL_USER_ACTION);
			addLogger(loggers, null, EnumLogType.GC_LOG);

			for (LogTypeInfo info : attachedLogTypes) {
				if (info.isOutputAll()) {
					addLogger(loggers, info.getType());
				}
				for (LogLevel level : info.getAdditionalLogLevels()) {
					addLogger(loggers, info.getType(), level);
				}
			}
		}

		return document.asXML();
	}

	Element addPatternLayout(Element element) {
		return element.addElement("PatternLayout").addAttribute("pattern", "%m%n");
	}

	Element addThresholdFilter(Element element, String level, String match, String mismatch) {
		return element.addElement("ThresholdFilter").addAttribute("level", level).addAttribute("onMatch", match)
				.addAttribute("onMismatch", mismatch);
	}

	Element addRollingFileAppenders(Element element, EnumLogType type, boolean outputAll,
			List<LogLevel> additionalLevels, List<EnumLogType> additionalTypes) {

		for (String logFolder : logFolders) {
			String folder = type == null ? logFolder : logFolder + "/" + type.toString().toLowerCase();
			if (outputAll) {
				Element file = element.addElement("RollingFile");
				file.addAttribute("name", getAppenderName(logFolder, type));
				file.addAttribute("fileName", folder + "/all.log");
				file.addAttribute("filePattern", folder + "/%d{yyyy-MM-dd}/all-%i.log");

				addPatternLayout(file);
				Element policies = file.addElement("Policies");
				policies.addElement("SizeBasedTriggeringPolicy").addAttribute("size", "1 GB");
				policies.addElement("TimeBasedTriggeringPolicy").addAttribute("interval", "1").addAttribute("modulate",
						"true");
				policies.addElement("OnStartupTriggeringPolicy");

				Element rollStrategy = file.addElement("DefaultRolloverStrategy");
				rollStrategy.addAttribute("fileIndex", "max");
				rollStrategy.addAttribute("max", "9999");
			}

			for (LogLevel level : additionalLevels) {
				String fileNameStr = level.toString().toLowerCase();
				Element file = element.addElement("RollingFile");
				file.addAttribute("name", getAppenderName(logFolder, type, level));
				file.addAttribute("fileName", folder + "/" + fileNameStr + ".log");
				file.addAttribute("filePattern", folder + "/%d{yyyy-MM-dd}/" + fileNameStr + "-%i.log");

				addPatternLayout(file);
				Element policies = file.addElement("Policies");
				policies.addElement("SizeBasedTriggeringPolicy").addAttribute("size", "1 GB");
				policies.addElement("TimeBasedTriggeringPolicy").addAttribute("interval", "1").addAttribute("modulate",
						"true");
				policies.addElement("OnStartupTriggeringPolicy");

				Element rollStrategy = file.addElement("DefaultRolloverStrategy");
				rollStrategy.addAttribute("fileIndex", "max");
				rollStrategy.addAttribute("max", "9999");
			}

			for (EnumLogType addType : additionalTypes) {
				String fileNameStr = addType.toString().toLowerCase();
				Element file = element.addElement("RollingFile");
				file.addAttribute("name", getAppenderName(logFolder, type, addType));
				file.addAttribute("fileName", folder + "/" + fileNameStr + ".log");
				file.addAttribute("filePattern", folder + "/%d{yyyy-MM-dd}/" + fileNameStr + "-%i.log");

				addPatternLayout(file);
				Element policies = file.addElement("Policies");
				policies.addElement("SizeBasedTriggeringPolicy").addAttribute("size", "1 GB");
				policies.addElement("TimeBasedTriggeringPolicy").addAttribute("interval", "1").addAttribute("modulate",
						"true");
				policies.addElement("OnStartupTriggeringPolicy");

				Element rollStrategy = file.addElement("DefaultRolloverStrategy");
				rollStrategy.addAttribute("fileIndex", "max");
				rollStrategy.addAttribute("max", "9999");
			}
		}

		return element;
	}

	Element addLogger(Element element, EnumLogType type) {
		Element logger = element.addElement("logger").addAttribute("name", getLoggerName(type))
				.addAttribute("level", "all").addAttribute("additivity", "false");
		for (String logFolder : logFolders) {
			logger.addElement("appender-ref").addAttribute("ref", getAppenderName(logFolder, type));
		}

		return element;
	}

	Element addLogger(Element element, EnumLogType type, EnumLogType addType) {
		Element logger = element.addElement("logger").addAttribute("name", getLoggerName(type, addType))
				.addAttribute("level", "all").addAttribute("additivity", "false");
		for (String logFolder : logFolders) {
			logger.addElement("appender-ref").addAttribute("ref", getAppenderName(logFolder, type, addType));
		}

		return element;
	}

	Element addLogger(Element element, EnumLogType type, LogLevel addLevel) {
		Element logger = element.addElement("logger").addAttribute("name", getLoggerName(type, addLevel))
				.addAttribute("level", "all").addAttribute("additivity", "false");
		for (String logFolder : logFolders) {
			logger.addElement("appender-ref").addAttribute("ref", getAppenderName(logFolder, type, addLevel));
		}

		return element;
	}

	String getLoggerName(EnumLogType type, EnumLogType addType) {
		return (type == null ? "DEFAULT" : type.toString()) + "_LOG_TYPE_" + addType.toString();
	}

	String getLoggerName(EnumLogType type, LogLevel level) {
		return (type == null ? "DEFAULT" : type.toString()) + "_LOG_LEVEL_" + level.toString();
	}

	String getLoggerName(EnumLogType type) {
		return (type == null ? "DEFAULT" : type.toString()) + "_ALL_LOGS";
	}

	String getAppenderName(String baseFolder, EnumLogType type) {
		return baseFolder.hashCode() + "_" + getLoggerName(type);
	}

	String getAppenderName(String baseFolder, EnumLogType type, EnumLogType addType) {
		return baseFolder.hashCode() + "_" + getLoggerName(type, addType);
	}

	String getAppenderName(String baseFolder, EnumLogType type, LogLevel level) {
		return baseFolder.hashCode() + "_" + getLoggerName(type, level);
	}

	public Logger getLogger(LogLevel level) {
		return LogManager.getLogger(getLoggerName(null, level));
	}

	public Logger getLogger(EnumLogType type) {
		return LogManager.getLogger(getLoggerName(null, type));
	}

	public Logger getLogger() {
		return LogManager.getLogger(getLoggerName(null));
	}

	public Logger getAttachedTypeLogger(EnumLogType type, LogLevel level) {
		return LogManager.getLogger(getLoggerName(type, level));
	}

	public Logger getAttachedTypeLogger(EnumLogType type) {
		return LogManager.getLogger(getLoggerName(type));
	}

	public Logger getConsoleLogger() {
		return LogManager.getLogger("DefaultConsoleLogger");
	}

	public static void main(String[] args) {
		Log4j2ConfigBuilder builder = new Log4j2ConfigBuilder();
		builder.setLogFolders(Arrays.asList("d:\\logs", "c:\\logs"));
		builder.attachLogType(new LogTypeInfo(EnumLogType.NODE_NOTICE, true, Arrays.asList(LogLevel.ERROR), true));
		System.out.println(builder.build());
	}
}
