package com.spark.commun.user.exception;

import com.spark.commun.exception.DataExistsException;

public class RoleNameExistsException extends DataExistsException {
	

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 4388035161022520464L;

	/**
	 * Exception code
	 */
	private static final String code = "ROLE_NAME_EXISTS_EXCEPTION";
	
	/**
	 * Exception message
	 */
	private static final String message = "Role Name Arrady exist";
	
	/**
	 * 
	 * @param code
	 * @param message
	 */
	public RoleNameExistsException() {
		super(code, message);
	}
}
