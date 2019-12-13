package com.spark.commun.user.rest.api;

import com.spark.commun.user.rest.dto.UserDto;

public interface UserApi {

	UserDto addUser(UserDto userDto);

	UserDto getUser(Long id);

	UserDto activateUser(Long id);

	UserDto getUserByUsername(String username);

}
