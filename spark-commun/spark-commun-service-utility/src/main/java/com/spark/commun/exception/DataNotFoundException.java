package com.spark.commun.exception;

import org.springframework.http.HttpStatus;

import com.spark.commun.exception.SparkException;

/**
 * Data not found exception. It will return the Not found HTTP status code
 */
public class DataNotFoundException extends SparkException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 * @param code
	 * @param message
	 */
	public DataNotFoundException(String code, String message) {
	super(HttpStatus.NOT_FOUND, code, message);
    }

}
