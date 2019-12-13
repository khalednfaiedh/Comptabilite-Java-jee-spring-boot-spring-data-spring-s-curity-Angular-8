package com.spark.tools.auth.client;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.spark.tools.auth.rest.dto.RoleDto;
import com.spark.tools.auth.rest.dto.UserDto;

@FeignClient(name = "user-service")
public interface  UserClient {
	
	/**
	 * Get user from user service
	 * @param username
	 * @return
	 */
	@RequestMapping(value = "/users", method = RequestMethod.GET)
    public UserDto getUserByUsername(@RequestParam("username") String username);
	

	/**
	 * Get Role from user service
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/roles/{id}", method = RequestMethod.GET)
    public RoleDto getRoleById(@PathVariable("id") Integer id);
	
}
