package com.spark.tools.auth.exception;

import com.spark.tools.auth.rest.dto.DataExceptionDto;

import lombok.Getter;

@Getter
public class ClientException extends RuntimeException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 7529832207523188822L;
	
	/**
	 * DataExceptionDto
	 */
	private DataExceptionDto exception;

	public ClientException(DataExceptionDto exception) {
		super(exception.getMessage());
		this.exception = exception;
	}

}
