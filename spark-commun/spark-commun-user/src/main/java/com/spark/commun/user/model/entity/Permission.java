package com.spark.commun.user.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Permission Model database
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PERMISSION")
public class Permission implements Serializable {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = -6179338029945173653L;

	/**
	 * Permission id/code
	 */
	@Id
	@Column(name = "CODE", updatable = false, nullable = false)
	private String code;

	/**
	 * Permission description
	 */
	@Column(name = "description")
	private String description;

}
