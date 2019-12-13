package com.spark.commun.user.exception;

import com.spark.commun.exception.DataNotFoundException;

/**
 * Data not found exception. It will return the Not found HTTP status code
 */
public class UserNotFoundException extends DataNotFoundException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 2718684463143771498L;
	
	/**
	 * Exception code
	 */
	private static final String code = "USER_NOT_FOUND_EXCEPTION";
	
	/**
	 * Exception message
	 */
	private static final String message = "User not found";
	
	/**
	 * 
	 * @param code
	 * @param message
	 */
	public UserNotFoundException() {
	super(code, message);
    }

}
