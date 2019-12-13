package com.spark.commun.user.rest.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * User Json object
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto {

	/**
	 * User id
	 */
	private Long id;

	/**
	 * User firstName
	 */
	private String firstName;

	/**
	 * User lastName
	 */
	private String lastName;

	/**
	 * User email
	 */
	private String email;

	/**
	 * User gender
	 */
	private String gender;

	/**
	 * User status
	 */
	private String status;

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
	private boolean active;
	
	/**
	 * Role
	 */
	private Integer roleId;

}
