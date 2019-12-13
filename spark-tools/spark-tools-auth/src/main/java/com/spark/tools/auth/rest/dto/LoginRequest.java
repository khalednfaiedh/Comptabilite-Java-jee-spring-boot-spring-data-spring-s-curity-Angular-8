package com.spark.tools.auth.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

	/**
	 * User login 
	 */
	private String login;

	/**
	 * User password
	 */
	private String password;
	
}