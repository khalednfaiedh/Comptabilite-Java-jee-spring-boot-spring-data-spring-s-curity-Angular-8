package com.spark.commun.user.rest.dto;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Role Json object
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class RoleDto {
	
	/**
	 * Role id
	 */
	private Integer id;

	/**
	 * Role name
	 */
	private String name;

	/**
	 * Role description
	 */
	private String description;

	/**
	 * Role permissions
	 */
	private Set<PermissionDto> permissions;
}
