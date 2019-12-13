package com.spark.tools.auth.rest.filter;

import java.net.ConnectException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.exceptions.InvalidGrantException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.tools.auth.exception.ClientException;
import com.spark.tools.auth.exception.SparkException;
import com.spark.tools.auth.rest.dto.DataExceptionDto;
import com.spark.tools.auth.utils.SecurityCode;

import feign.FeignException;
import lombok.extern.slf4j.Slf4j;


/**
 * Rest Exception handler
 */
@ControllerAdvice
@Slf4j
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
		log.warn(ex.getMessage(), ex);
		DataExceptionDto response = new DataExceptionDto(ex.getHttpStatus(), ex.getCode(), ex.getMessage(), ex.getData());
		return new ResponseEntity<Object>(response,	new HttpHeaders(), ex.getHttpStatus());
	}

	/**
	 * Spring security authentification Handle
	 * @param ex
	 * @param request
	 * @return
	 */
	@ExceptionHandler({ InvalidGrantException.class })
	public ResponseEntity<Object> handleInvalidGrantException(InvalidGrantException ex, WebRequest request) {
		log.warn(ex.getMessage(), ex);
		String code = SecurityCode.SECURITY_EXCEPTION_CODE;
		if(ex.getMessage().equals("User is disabled")) {
			code = SecurityCode.ACCOUNT_STATUS_EXCEPTION_CODE;
		} else if(ex.getMessage().equals("Bad credentials")) {
			code = SecurityCode.BAD_CREDENTIALS_EXCEPTION_CODE;
		}
		DataExceptionDto response = new DataExceptionDto(HttpStatus.UNAUTHORIZED, code, ex.getMessage(), null);
		return new ResponseEntity<Object>(response,	new HttpHeaders(), HttpStatus.UNAUTHORIZED);
	}
	
	/**
	 * Client Error handle  handle
	 * 
	 * @param ex
	 * @param request
	 * @return
	 * @throws Exception 
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
		DataExceptionDto response = new DataExceptionDto(HttpStatus.SERVICE_UNAVAILABLE, SecurityCode.CONNECTION_EXCEPTION_CODE, ex.getMessage(), null);
		return new ResponseEntity<Object>(response,	new HttpHeaders(), HttpStatus.SERVICE_UNAVAILABLE);
	}

	/**
	 * Other Exception handle
	 * 
	 * @param ex
	 * @param request
	 * @return
	 */
//	@ExceptionHandler({ Exception.class })
//	public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
//		DataExceptionDto response = new DataExceptionDto(HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", ex.getMessage(), null);
//		return new ResponseEntity<Object>(response,	new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
//	}
	
}
