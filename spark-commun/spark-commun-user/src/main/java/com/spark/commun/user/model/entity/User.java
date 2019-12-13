package com.spark.commun.user.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.spark.commun.user.model.enumeration.GenderEnum;
import com.spark.commun.user.model.enumeration.StatusEnum;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * User Model database
 */
@Data
@AllArgsConstructor
@Entity
@Table(name = "USER_")
public class User {

	/**
	 * User id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_generator")
	@SequenceGenerator(name = "user_generator", sequenceName = "USER_SEQ", initialValue = 1, allocationSize = 1)
	@Column(name = "ID", updatable = false, nullable = false)
	private Long id;

	/**
	 * User firstName
	 */
	@Column(name = "FIRST_NAME")
	private String firstName;

	/**
	 * User lastName
	 */
	@Column(name = "Last_NAME")
	private String lastName;

	/**
	 * User email
	 */
	@Column(name = "EMAIL")
	private String email;

	/**
	 * User gender
	 */
	@Column(name = "GENDER", length = 1)
	@Enumerated(EnumType.STRING)
	private GenderEnum gender;

	/**
	 * User status
	 */
	@Column(name = "STATUS")
	@Enumerated(EnumType.STRING)
	private StatusEnum status;

	/**
	 * User username
	 */
	@Column(name = "LOGIN", unique = true)
	private String username;

	/**
	 * User password
	 */
	@Column(name = "PASSWORD")
	private String password;

	/**
	 * User role
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({ @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID") })
	private Role role;

	/**
	 * active
	 */
	@Transient
	private boolean active;

	/**
	 * Default constructor
	 */
	public User() {
		this.status = StatusEnum.ACTIVE;
	}

	/**
	 * @return the active
	 */
	public boolean isActive() {
		if (status == null || status == StatusEnum.INACTIVE) {
			active = false;
		} else {
			active = true;
		}
		return active;
	}
}
