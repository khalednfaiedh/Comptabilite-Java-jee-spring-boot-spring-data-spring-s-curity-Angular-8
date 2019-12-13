package com.spark.commun.user.rest.api.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spark.commun.user.model.entity.Role;
import com.spark.commun.user.model.entity.User;
import com.spark.commun.user.rest.api.UserApi;
import com.spark.commun.user.rest.dto.UserDto;
import com.spark.commun.user.rest.mapper.UserMapper;
import com.spark.commun.user.service.UserService;

@Service
public class UserApiImpl implements UserApi {

	@Autowired
	private UserService userService;

	@Autowired
	private UserMapper userMapper;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UserDto addUser(UserDto userDto) {
		User user = userMapper.toUser(userDto);
		if (userDto.getRoleId() != null) {
			Role role = new Role(userDto.getRoleId(), null, null, null, null);
			user.setRole(role);
		}
		user = userService.saveUser(user);

		userDto = userMapper.toUserDto(user);
		return userDto;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UserDto getUser(Long id) {
		User user = userService.findUserById(id);
		UserDto userDto = userMapper.toUserDto(user);
		return userDto;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UserDto activateUser(Long id) {
		User user = userService.activateUser(id);
		UserDto userDto = userMapper.toUserDto(user);
		return userDto;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UserDto getUserByUsername(String username) {
		User user = userService.findUserByUsername(username);
		UserDto userDto = userMapper.toUserDto(user);
		if (user.getRole() != null) {
			userDto.setRoleId(user.getRole().getId());
		}
		return userDto;
	}

}
