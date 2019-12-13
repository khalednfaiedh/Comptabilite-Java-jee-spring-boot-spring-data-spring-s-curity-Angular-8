package com.spark.commun.user.rest.mapper;

import org.mapstruct.Mapper;

import com.spark.commun.user.model.entity.Permission;
import com.spark.commun.user.rest.dto.PermissionDto;

@Mapper(componentModel = "spring")
public interface PermissionMapper {

	Permission toPermission(PermissionDto permissionDto);

	PermissionDto toPermissionDto(Permission permission);
}
