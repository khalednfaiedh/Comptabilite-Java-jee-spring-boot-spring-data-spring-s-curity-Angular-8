package com.spark.tools.auth.service.impl;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spark.tools.auth.client.UserClient;
import com.spark.tools.auth.exception.ClientException;
import com.spark.tools.auth.model.MyUserDetails;
import com.spark.tools.auth.rest.dto.DataExceptionDto;
import com.spark.tools.auth.rest.dto.RoleDto;
import com.spark.tools.auth.rest.dto.UserDto;
import com.spark.tools.auth.utils.AuthenticationUtilities;

import feign.FeignException;

@Service
public class UserServiceImpl implements UserDetailsService {

	/**
	 * user Client
	 */
	@Autowired
	private UserClient userClient;
	

	/**
	 * Object Mapper
	 */
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public UserDetails loadUserByUsername(String username) {
		
		String authUsername = AuthenticationUtilities.getAuthUsername();
		UserDto user = null;
		RoleDto role = null;
		try {
			if(authUsername.equals(AuthenticationUtilities.WEB_CLIENT_USERNAME)) {
				user = userClient.getUserByUsername(username);
			}
			if((user != null) && (user.getRoleId() != null)) {
				role = userClient.getRoleById(user.getRoleId());
			}
		} catch (HttpClientErrorException ex) {
			try {
				DataExceptionDto  dataExceptionDto = objectMapper.readValue(ex.getResponseBodyAsString(), DataExceptionDto.class);
				dataExceptionDto.setStatus(HttpStatus.UNAUTHORIZED.value());
				dataExceptionDto.setError(HttpStatus.UNAUTHORIZED.name());
				throw new ClientException(dataExceptionDto);
			} catch (IOException e) {
				throw ex;
			}
		}  catch (FeignException ex) {
			try {
				DataExceptionDto  dataExceptionDto = objectMapper.readValue(ex.getMessage().substring(ex.getMessage().indexOf("\n")+1), DataExceptionDto.class);
				dataExceptionDto.setStatus(HttpStatus.UNAUTHORIZED.value());
				dataExceptionDto.setError(HttpStatus.UNAUTHORIZED.name());
				throw new ClientException(dataExceptionDto);
			} catch (IOException e) {
				throw ex;
			}
		} catch (Exception ex) {
			throw ex;
		}
		
		if (user == null) {
			throw new UsernameNotFoundException("No user with username: " + username);
		} else {
			return new MyUserDetails(user, role);
		}
	}

}
