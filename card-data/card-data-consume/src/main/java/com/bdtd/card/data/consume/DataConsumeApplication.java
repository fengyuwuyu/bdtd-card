package com.bdtd.card.data.consume;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bdtd.card.data.consume.dao.UserMapper;
import com.bdtd.card.data.consume.model.User;

@SpringBootApplication
@EnableAutoConfiguration
public class DataConsumeApplication {

	public static void main(String[] args) throws Exception {
		ApplicationContext ac = SpringApplication.run(DataConsumeApplication.class, args);
		UserMapper userMapper = ac.getBean(UserMapper.class);
		System.out.println(userMapper.getByAccount("admin"));
		Wrapper<User> wrapper = new QueryWrapper<>();
		System.out.println(userMapper.selectList(wrapper ));
	}

}
