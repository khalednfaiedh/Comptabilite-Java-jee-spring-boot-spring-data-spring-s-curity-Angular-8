package com.spark.commun.user.config.security;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

import com.spark.commun.config.security.OAuth2ResourceServerConfig;

@Configuration
@Order(1)
@ComponentScan(basePackages = { "com.spark.commun"})
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Override
	public void configure(HttpSecurity http) throws Exception {
		OAuth2ResourceServerConfig.globalconfigure(http);
		http.antMatcher("/**").authorizeRequests()
		.antMatchers(HttpMethod.GET, "/users").permitAll()
		.antMatchers(HttpMethod.GET, "/roles/{id}").permitAll()
		.anyRequest().authenticated();
	}
}
