package com.spark.commun.user.service;

import com.spark.commun.user.model.entity.Role;
import com.spark.commun.user.model.entity.User;

public interface UserService {

	User saveUser(User user);

	User findUserByUsername(String username);

	Role saveRole(Role role);

	User activateUser(Long userId);

	Role getRole(Integer id);

	User findUserById(Long id);

}
