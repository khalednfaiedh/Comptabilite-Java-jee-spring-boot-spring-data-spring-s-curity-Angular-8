package com.spark.commun.user.exception;

import com.spark.commun.exception.DataExistsException;

public class EmailExistsException extends DataExistsException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 2763612409330759150L;

	/**
	 * Exception code
	 */
	private static final String code = "EMAIL_EXISTS_EXCEPTION";
	
	/**
	 * Exception message
	 */
	private static final String message = "Email Arrady exist";
	
	/**
	 * 
	 * @param code
	 * @param message
	 */
	public EmailExistsException() {
		super(code, message);
	}
}
