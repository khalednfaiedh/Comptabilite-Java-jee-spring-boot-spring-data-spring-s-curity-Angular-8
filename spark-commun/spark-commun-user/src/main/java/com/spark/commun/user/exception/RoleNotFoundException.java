package com.spark.commun.user.exception;

import com.spark.commun.exception.DataNotFoundException;

/**
 * Data not found exception. It will return the Not found HTTP status code
 */
public class RoleNotFoundException extends DataNotFoundException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -2376704463960127536L;

	/**
	 * Exception code
	 */
	private static final String code = "ROLE_NOT_FOUND_EXCEPTION";
	
	/**
	 * Exception message
	 */
	private static final String message = "Role not found";
	
	/**
	 * 
	 * @param code
	 * @param message
	 */
	public RoleNotFoundException() {
	super(code, message);
    }

}
