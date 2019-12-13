package com.spark.commun.user.exception;

import com.spark.commun.exception.DataExistsException;

public class UsernameExistsException extends DataExistsException {
	
	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 499838760683814779L;

	/**
	 * Exception code
	 */
	private static final String code = "USERNAME_EXISTS_EXCEPTION";
	
	/**
	 * Exception message
	 */
	private static final String message = "Username Arrady exist";

	/**
	 * 
	 * @param code
	 * @param message
	 */
	public UsernameExistsException() {
		super(code, message);
	}
}
