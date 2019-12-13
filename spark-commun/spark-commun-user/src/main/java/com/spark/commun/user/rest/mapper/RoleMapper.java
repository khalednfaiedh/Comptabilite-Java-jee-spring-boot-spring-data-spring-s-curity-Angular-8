package com.spark.commun.user.rest.mapper;

import org.mapstruct.Mapper;

import com.spark.commun.user.model.entity.Role;
import com.spark.commun.user.rest.dto.RoleDto;

@Mapper(componentModel = "spring")
public interface RoleMapper {

	Role toRole(RoleDto roleDto);

	RoleDto toRoleDto(Role role);
}
