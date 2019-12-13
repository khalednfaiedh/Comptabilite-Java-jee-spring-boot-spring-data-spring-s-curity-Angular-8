package com.spark.commun.rest.filter;

import java.net.ConnectException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.commun.exception.ClientException;
import com.spark.commun.exception.SparkException;
import com.spark.commun.rest.dto.DataExceptionDto;

import feign.FeignException;

/**
 * Rest Exception handler
 */
@ControllerAdvice
public class ResponseExceptionFilter extends ResponseEntityExceptionHandler {

	/**
	 * Object Mapper
	 */
	@Autowired
	private ObjectMapper objectMapper;
	
	/**
	 * SparkException handler: construct and return <code>DataExceptionDto</code> json response object.
	 * 
	 * @param ex : SparkException
	 * @param request : WebRequest
	 * @return ResponseEntity
	 */
	@ExceptionHandler({ SparkException.class })
	public ResponseEntity<Object> handleSparkException(SparkException ex, WebRequest request) {
		DataExceptionDto response = new DataExceptionDto(ex.getHttpStatus(), ex.getCode(), ex.getMessage(), ex.getData());
		return new ResponseEntity<Object>(response,	new HttpHeaders(), ex.getHttpStatus());
	}

	/**
	 * Client Error handle  handle
	 * 
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler({ ClientException.class, FeignException.class })
	public ResponseEntity<Object> handleHttpClientErrorException(Exception ex, WebRequest request)  {
		DataExceptionDto response = null;
		if(ex.getCause() instanceof ClientException) {
			response = ((ClientException)ex.getCause()).getException();
		} else {
			try {
				response = objectMapper.readValue(ex.getMessage().substring(ex.getMessage().indexOf("\n")+1), DataExceptionDto.class);
			} catch (Exception e) {
//				return handleGlobalException(e, request);
			}
		}
		return new ResponseEntity<Object>(response,	new HttpHeaders(), HttpStatus.valueOf(response.getStatus()));
	}
	
	/**
	 * Connection Exception handle
	 * 
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler({ ResourceAccessException.class, ConnectException.class })
	public ResponseEntity<Object> handleHttpConnectException(Exception ex, WebRequest request) {
		DataExceptionDto response = new DataExceptionDto(HttpStatus.SERVICE_UNAVAILABLE, "ERROR_SERVER_001", ex.getMessage(), null);
		return new ResponseEntity<Object>(response,	new HttpHeaders(), HttpStatus.SERVICE_UNAVAILABLE);
	}
}
