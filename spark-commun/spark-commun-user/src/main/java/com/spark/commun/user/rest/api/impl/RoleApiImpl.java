package com.spark.commun.user.rest.api.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spark.commun.user.model.entity.Role;
import com.spark.commun.user.rest.api.RoleApi;
import com.spark.commun.user.rest.dto.RoleDto;
import com.spark.commun.user.rest.mapper.RoleMapper;
import com.spark.commun.user.service.UserService;

@Service
public class RoleApiImpl implements RoleApi {

	@Autowired
	private RoleMapper roelMapper;

	@Autowired
	private UserService userService;

	/**
	 * {@inheritDoc}
	 */
	@Override
	public RoleDto addRole(RoleDto roleDto) {
		Role role = roelMapper.toRole(roleDto);
		role = userService.saveRole(role);
		roleDto = roelMapper.toRoleDto(role);
		return roleDto;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public RoleDto getRoleById(Integer id) {
		Role role = userService.getRole(id);
		RoleDto roleDto = roelMapper.toRoleDto(role);
		return roleDto;
	}

}
