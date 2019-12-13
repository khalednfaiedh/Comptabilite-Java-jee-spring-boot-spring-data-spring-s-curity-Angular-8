package com.spark.tools.auth.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

	/**
	 * User id
	 */
	private Long id;

	/**
	 * User first name
	 */
	private String firstName;

	/**
	 * User last name
	 */
	private String lastName;

	/**
	 * Email of the Agent
	 */
	private String email;

	/**
	 * User username
	 */
	private String username;

	/**
	 * User password
	 */
	private String password;

	/**
	 * active
	 */
	private Boolean active;
	
	/**
	 * Role
	 */
	private Integer roleId;

}