package com.bdtd.card.web.admin.config;

import java.util.Arrays;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.bdtd.card.common.web.convert.String2DateConverter;
import com.bdtd.card.common.web.convert.String2IntegerArrayConverter;
import com.bdtd.card.common.web.convert.String2LocalDateConverter;
import com.bdtd.card.common.web.convert.String2LocalDateTimeConverter;
import com.bdtd.card.common.web.convert.String2LocalTimeConverter;
import com.bdtd.card.common.web.convert.String2LongArrayConverter;
import com.bdtd.card.common.web.convert.String2StringArrayConverter;
import com.bdtd.card.common.web.filter.XssFilter;
import com.bdtd.card.common.web.properties.BaseProperties;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Autowired
	private BaseProperties bdtdProperties;

	@Override
	public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(new String2DateConverter());
		registry.addConverter(new String2LongArrayConverter());
		registry.addConverter(new String2IntegerArrayConverter());
		registry.addConverter(new String2StringArrayConverter());
		registry.addConverter(new String2LocalDateConverter());
		registry.addConverter(new String2LocalDateTimeConverter());
		registry.addConverter(new String2LocalTimeConverter());
	}
	
    /**
     * 增加swagger的支持
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (bdtdProperties.getSwaggerOpen()) {
            registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
            registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        }
    }

    /**
     * xssFilter注册
     */
    @Bean
    public FilterRegistrationBean<XssFilter> xssFilterRegistration() {
        XssFilter xssFilter = new XssFilter();
        xssFilter.setUrlExclusion(Arrays.asList("/notice/update", "/notice/add"));
        FilterRegistrationBean<XssFilter> registration = new FilterRegistrationBean<>(xssFilter);
        registration.addUrlPatterns("/*");
        return registration;
    }

    /**
     * RequestContextListener注册
     */
    @Bean
    public ServletListenerRegistrationBean<RequestContextListener> requestContextListenerRegistration() {
        return new ServletListenerRegistrationBean<>(new RequestContextListener());
    }

    /**
     * 验证码生成相关
     */
    @Bean
    public DefaultKaptcha kaptcha() {
        Properties properties = new Properties();
        properties.put("kaptcha.border", "no");
        properties.put("kaptcha.border.color", "105,179,90");
        properties.put("kaptcha.textproducer.font.color", "blue");
        properties.put("kaptcha.image.width", "125");
        properties.put("kaptcha.image.height", "45");
        properties.put("kaptcha.textproducer.font.size", "45");
        properties.put("kaptcha.session.key", "code");
        properties.put("kaptcha.textproducer.char.length", "4");
        properties.put("kaptcha.textproducer.font.names", "宋体,楷体,微软雅黑");
        Config config = new Config(properties);
        DefaultKaptcha defaultKaptcha = new DefaultKaptcha();
        defaultKaptcha.setConfig(config);
        return defaultKaptcha;
    }
}
