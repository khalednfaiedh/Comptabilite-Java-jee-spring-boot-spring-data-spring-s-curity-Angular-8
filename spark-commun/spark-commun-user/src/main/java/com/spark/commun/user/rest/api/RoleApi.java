package com.spark.commun.user.rest.api;

import com.spark.commun.user.rest.dto.RoleDto;

public interface RoleApi {

	RoleDto addRole(RoleDto roleDto);

	RoleDto getRoleById(Integer id);

}
