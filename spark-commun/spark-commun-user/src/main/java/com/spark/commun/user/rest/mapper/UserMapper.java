package com.spark.commun.user.rest.mapper;

import org.mapstruct.Mapper;

import com.spark.commun.user.model.entity.User;
import com.spark.commun.user.rest.dto.UserDto;

@Mapper(componentModel = "spring")
public interface UserMapper {

	User toUser(UserDto userDto);

	UserDto toUserDto(User user);

}
