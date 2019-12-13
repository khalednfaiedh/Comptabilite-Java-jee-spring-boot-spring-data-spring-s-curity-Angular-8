package com.spark.commun.user.rest.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spark.commun.user.rest.api.RoleApi;
import com.spark.commun.user.rest.dto.RoleDto;
import com.spark.commun.utility.RoleUtility;

/**
 * User Controller
 */
@RestController
@RequestMapping(value = "/roles", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController {
	
	/**
	 * User Service
	 */
	@Autowired
	private RoleApi roleApi;
	
	/**
	 * Save Role
	 * 
	 * @param id
	 * @return
	 */
	@PreAuthorize("hasAuthority('" + RoleUtility.ADD_ROLE + "')")
	@PostMapping("")
	public Object addRole(@Valid @RequestBody RoleDto roleDto) {
		roleDto = roleApi.addRole(roleDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(roleDto);
	}
	
	/**
	 * get Role By ID
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("/{id}")
	public Object getRoleById(@PathVariable("id") Integer id) {
		RoleDto roleDto = roleApi.getRoleById(id);
		return ResponseEntity.status(HttpStatus.OK).body(roleDto);
	}
}
