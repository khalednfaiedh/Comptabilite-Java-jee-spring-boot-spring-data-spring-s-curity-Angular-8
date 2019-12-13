package com.spark.commun.user.model.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ROLE Model database
 */
@Data
@AllArgsConstructor
@Entity
@Table(name = "ROLE")
public class Role {

	/**
	 * Role id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_generator")
	@SequenceGenerator(name = "role_generator", sequenceName = "ROLE_SEQ", initialValue = 10, allocationSize = 1)
	@Column(name = "ROLE_ID", updatable = false, nullable = false)
	private Integer id;

	/**
	 * Role name
	 */
	@Column(name = "name")
	private String name;

	/**
	 * Role description
	 */
	@Column(name = "description")
	private String description;

	/**
	 * Role users
	 */
	@OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
	private Set<User> users;

	/**
	 * Role permissions
	 */
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "ROLE_PERMISSION", joinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID"), inverseJoinColumns = @JoinColumn(name = "PERMISSION_ID", referencedColumnName = "CODE"))
	private Set<Permission> permissions;

	/**
	 * Default constructor
	 */
	public Role() {
		permissions = new HashSet<Permission>();
	}

}
