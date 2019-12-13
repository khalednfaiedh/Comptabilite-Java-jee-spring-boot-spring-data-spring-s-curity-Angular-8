package com.spark.tools.auth.utils;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class AuthenticationUtilities {

	public final static String WEB_CLIENT_USERNAME = "OAuth2WebUser";
	public final static String WEB_CLIENT_PASSWORD = "secret";
	public final static String[] WEB_CLIENT_SCOOP = { "web" };

	/**
	 * get client user name
	 * @return
	 */
	public static String getAuthUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
		return principal.getUsername();
	}
	
	/**
	 * get current http request
	 * 
	 * @return
	 */
	public static HttpServletRequest getRequest()  {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request;
	}
}
