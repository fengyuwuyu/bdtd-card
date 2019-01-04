package com.bdtd.card.service.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bdtd.card.data.admin.dao.UserMapper;
import com.bdtd.card.data.admin.model.User;

@SpringBootApplication(scanBasePackages= {"com.bdtd.card"})
@EnableTransactionManagement
@EnableCaching
@ServletComponentScan
public class AdminApplication {

	public static void main(String[] args) throws Exception {
		ApplicationContext ac = SpringApplication.run(AdminApplication.class, args);
		UserMapper userMapper = ac.getBean(UserMapper.class);
		QueryWrapper<User> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", "admin");
		userMapper.selectOne(queryWrapper);
	}

}
