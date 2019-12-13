package com.spark.commun.exception;

import org.springframework.http.HttpStatus;

import com.spark.commun.exception.SparkException;

/**
 * Data found exception. It will return the BAD_REQUEST HTTP status code
 */
public class DataExistsException extends SparkException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 1L;
	private static final String CODE = "Data_Exists_Exception";
	 
	/**
	 * 
	 * @param code
	 * @param message
	 */
	public DataExistsException(String code, String message) {
		super(HttpStatus.BAD_REQUEST, code, message);
	}
	
	/**
	 * 
	 * @param code
	 * @param message
	 */
	 
}
