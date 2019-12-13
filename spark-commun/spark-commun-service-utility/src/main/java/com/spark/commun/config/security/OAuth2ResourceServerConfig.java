package com.spark.commun.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
public class OAuth2ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Autowired
	private JwtConfig jwtServerConfig;

	@Override
	public void configure(ResourceServerSecurityConfigurer config) {
		config.tokenStore(jwtServerConfig.tokenStore());
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		globalconfigure(http);
		http.antMatcher("/**").authorizeRequests()
			.anyRequest().authenticated();
	}
	
	
	public static void globalconfigure(HttpSecurity http) throws Exception {
		http
			.antMatcher("/**").authorizeRequests()
				.antMatchers("/swagger-ui.html", "/swagger-resources/**", "/v2/**", "/webjars/springfox-swagger-ui/**").permitAll()
			.and().csrf().disable();
	}
}
