package com.bdtd.card.common.web.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix=MailProperties.PREFIX)
public class MailProperties {

	public static final String PREFIX = "bdtd.mail";
	
	private String fromMail;
	private String fromMailPassword;

	public String getFromMail() {
		return fromMail;
	}

	public void setFromMail(String fromMail) {
		this.fromMail = fromMail;
	}

	public String getFromMailPassword() {
		return fromMailPassword;
	}

	public void setFromMailPassword(String fromMailPassword) {
		this.fromMailPassword = fromMailPassword;
	}

	@Override
	public String toString() {
		return "MailProperties [fromMail=" + fromMail + ", fromMailPassword=" + fromMailPassword + "]";
	}

}
