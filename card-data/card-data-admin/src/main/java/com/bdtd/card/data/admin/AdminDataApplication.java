package com.bdtd.card.data.admin;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.bdtd.card.data.admin.dao.UserMapper;
import com.bdtd.card.data.admin.model.User;

@SpringBootApplication(scanBasePackages = {"com.bdtd.card.data"})
@EnableAutoConfiguration
public class AdminDataApplication {
	
	static Logger log = LoggerFactory.getLogger(AdminDataApplication.class);
	
	public static void main(String[] args) throws Exception {
		ApplicationContext ac = SpringApplication.run(AdminDataApplication.class, args);
		UserMapper userMapper = ac.getBean(UserMapper.class);
		List<User> users = userMapper.selectList(null);
		log.info(users.toString());
	}


}
