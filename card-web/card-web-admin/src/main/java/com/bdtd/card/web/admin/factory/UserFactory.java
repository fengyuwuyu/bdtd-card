package com.bdtd.card.web.admin.factory;

import org.springframework.beans.BeanUtils;

import com.bdtd.card.data.admin.model.User;
import com.bdtd.card.web.admin.model.UserDto;

/**
 * 用户创建工厂
 *
 * @author 
 * @date 2017-05-05 22:43
 */
public class UserFactory {

    public static User createUser(UserDto userDto){
        if(userDto == null){
            return null;
        }else{
            User user = new User();
            BeanUtils.copyProperties(userDto,user);
            return user;
        }
    }
}
