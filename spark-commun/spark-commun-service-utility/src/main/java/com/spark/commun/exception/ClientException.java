package com.spark.commun.exception;

import com.spark.commun.rest.dto.DataExceptionDto;

import lombok.Getter;

@Getter
public class ClientException extends RuntimeException {

	/**
	 * generated serial ID
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * DataExceptionDto
	 */
	private DataExceptionDto exception;

	public ClientException(DataExceptionDto exception) {
		super(exception.getMessage());
		this.exception = exception;
	}

}
