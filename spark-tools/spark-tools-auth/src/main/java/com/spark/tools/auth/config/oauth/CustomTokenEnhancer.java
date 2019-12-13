package com.spark.tools.auth.config.oauth;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

import com.spark.tools.auth.model.MyUserDetails;
import com.spark.tools.auth.rest.dto.UserDto;

/**
 * Add custom user principal information to the JWT token
 */
public class CustomTokenEnhancer extends JwtAccessTokenConverter {

	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
		Map<String, Object> additionalInfo  = new LinkedHashMap<String, Object>(accessToken.getAdditionalInformation());
		UserDto user = new UserDto();
		user.setId(userDetails.getUser().getId());
		user.setFirstName(userDetails.getUser().getFirstName());
		user.setLastName(userDetails.getUser().getLastName());
        additionalInfo.put("user", user);
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(additionalInfo);
		return accessToken;
	}
	
}
