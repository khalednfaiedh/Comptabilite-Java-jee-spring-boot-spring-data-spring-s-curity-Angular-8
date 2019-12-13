/**
 * 
 */
package com.spark.tools.auth.rest.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.endpoint.TokenEndpoint;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spark.tools.auth.rest.dto.LoginRequest;

/**
 * Authentication API
 */
@RestController
public class AuthController {

	@Autowired
	private TokenEndpoint tokenEndpoint;

	/**
	 * Override the get token service
	 * 
	 * @param principal
	 * @param request
	 * @return
	 * @throws HttpRequestMethodNotSupportedException
	 */
	@RequestMapping(value = "/oauth/token", method = RequestMethod.POST)
	public ResponseEntity<OAuth2AccessToken> getAccessToken(Principal principal, @RequestBody LoginRequest request) throws HttpRequestMethodNotSupportedException {
		Map<String, String> parameters = new HashMap<String, String>();
		parameters.put("username", request.getLogin());
		parameters.put("password", request.getPassword());
		parameters.put("grant_type", "password");
		try {

			ResponseEntity<OAuth2AccessToken> response = tokenEndpoint.postAccessToken(principal, parameters);
			response.getBody().getAdditionalInformation().clear();
			return response;
		} catch (Exception e) {
			throw e;
		}
	}

	/**
	 * get current user
	 * 
	 * @param principal
	 * @return
	 */
	@RequestMapping(value = "/current", method = RequestMethod.GET)
	public Principal getUser(Principal principal) {
		return principal;
	}
}
