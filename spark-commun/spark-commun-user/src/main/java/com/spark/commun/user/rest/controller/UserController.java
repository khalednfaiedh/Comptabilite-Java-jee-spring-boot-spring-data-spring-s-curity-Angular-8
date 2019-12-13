package com.spark.commun.user.rest.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spark.commun.user.rest.api.UserApi;
import com.spark.commun.user.rest.dto.UserDto;
import com.spark.commun.utility.RoleUtility;

/**
 * User Controller
 */
@RestController
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	/**
	 * User Service
	 */
	@Autowired
	private UserApi userApi;

	/**
	 * Save User
	 * 
	 * @param id
	 * @return
	 */
	@PreAuthorize("hasAuthority('" + RoleUtility.ADD_USER + "')")
	@PostMapping("")
	public Object addUser(@Valid @RequestBody UserDto userDto) {
		userDto = userApi.addUser(userDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
	}

	/**
	 * Get user by id
	 * 
	 * @param id
	 * @return
	 */
	@PreAuthorize("hasAuthority('" + RoleUtility.GET_USER + "')")
	@GetMapping("/{id}")
	public Object getUser(@PathVariable("id") Long id) {
		UserDto userDto = userApi.getUser(id);
		return ResponseEntity.status(HttpStatus.CREATED).body(userDto);
	}

	/**
	 * Activate User
	 * 
	 * @param id
	 * @return
	 */
	@PatchMapping("/{id}/activate")
	public Object activateUser(@PathVariable("id") Long id) {
		UserDto userDto = userApi.activateUser(id);
		return ResponseEntity.status(HttpStatus.OK).body(userDto);
	}

	/**
	 * get User By Username
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping("")
	public Object getUserByUsername(@RequestParam("username") String username) {
		UserDto userDto = userApi.getUserByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(userDto);
	}
}
