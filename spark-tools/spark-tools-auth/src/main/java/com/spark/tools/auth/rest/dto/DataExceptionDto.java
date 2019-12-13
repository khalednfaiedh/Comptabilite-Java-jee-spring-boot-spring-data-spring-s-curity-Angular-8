package com.spark.tools.auth.rest.dto;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Json Object to return when exception is throwing
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataExceptionDto {

	/**
	 * response status code
	 */
	private int status;
	
	/**
	 * response status
	 */
	private String error;
	
	/**
	 * Code Exception
	 */
	private String code;
	
	/**
	 * Exception message
	 */
	private String message;
	
	/**
	 * Exception details data
	 */
	private Object data;

	/**
	 * 
	 * @param httpStatus
	 * @param code
	 * @param message
	 * @param data
	 */
	public DataExceptionDto(HttpStatus httpStatus, String code, String message, Object data) {
		this.status = httpStatus.value();
		this.error = httpStatus.name();
		this.code = code;
		this.message = message;
		this.data = data;
	}
}