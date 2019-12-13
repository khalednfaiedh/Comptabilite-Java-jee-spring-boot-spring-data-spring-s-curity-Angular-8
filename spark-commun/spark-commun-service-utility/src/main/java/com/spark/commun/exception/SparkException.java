package com.spark.commun.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class SparkException extends RuntimeException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 1L;
	
	private HttpStatus httpStatus;
	private String code;
	private String message;
	private Object data;

	public SparkException(HttpStatus httpStatus, String code, String message) {
		super(message);
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
	}

	public SparkException(HttpStatus httpStatus, String code, String message, Object data) {
		super(message);
		this.httpStatus = httpStatus;
		this.code = code;
		this.message = message;
		this.data = data;
	}
}
