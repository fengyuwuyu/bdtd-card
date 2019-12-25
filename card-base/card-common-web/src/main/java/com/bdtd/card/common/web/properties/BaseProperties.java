package com.bdtd.card.common.web.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = BaseProperties.PREFIX)
public class BaseProperties {

	public static final String PREFIX = "bdtd";

	private Boolean swaggerOpen;
	private Boolean multipleDb;
	private Boolean kaptchaOpen = false;
	private String fileUploadPath;
	private Boolean springSessionOpen = false;
	private Integer sessionInvalidateTime = 30 * 60;
	private Integer sessionValidationInterval = 15 * 60;

	public Boolean getSwaggerOpen() {
		return swaggerOpen;
	}

	public void setSwaggerOpen(Boolean swaggerOpen) {
		this.swaggerOpen = swaggerOpen;
	}

	public Boolean getMultipleDb() {
		return multipleDb;
	}

	public void setMultipleDb(Boolean multipleDb) {
		this.multipleDb = multipleDb;
	}

	public Boolean getKaptchaOpen() {
		return kaptchaOpen;
	}

	public void setKaptchaOpen(Boolean kaptchaOpen) {
		this.kaptchaOpen = kaptchaOpen;
	}

	public String getFileUploadPath() {
		return fileUploadPath;
	}

	public void setFileUploadPath(String fileUploadPath) {
		this.fileUploadPath = fileUploadPath;
	}

	public Boolean getSpringSessionOpen() {
		return springSessionOpen;
	}

	public void setSpringSessionOpen(Boolean springSessionOpen) {
		this.springSessionOpen = springSessionOpen;
	}

	public Integer getSessionInvalidateTime() {
		return sessionInvalidateTime;
	}

	public void setSessionInvalidateTime(Integer sessionInvalidateTime) {
		this.sessionInvalidateTime = sessionInvalidateTime;
	}

	public Integer getSessionValidationInterval() {
		return sessionValidationInterval;
	}

	public void setSessionValidationInterval(Integer sessionValidationInterval) {
		this.sessionValidationInterval = sessionValidationInterval;
	}

	@Override
	public String toString() {
		return "BdtdProperties [swaggerOpen=" + swaggerOpen + ", multipleDb=" + multipleDb + ", kaptchaOpen="
				+ kaptchaOpen + ", fileUploadPath=" + fileUploadPath + ", springSessionOpen=" + springSessionOpen
				+ ", sessionInvalidateTime=" + sessionInvalidateTime + ", sessionValidationInterval="
				+ sessionValidationInterval + "]";
	}

}
