/**
 * 
 */
package com.spark.tools.discovery.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

/**
 * Dashboard Security
 */
@Configuration
public class AdminSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER)
        	.and().httpBasic().disable().authorizeRequests()
    		.antMatchers(HttpMethod.GET, "/").hasRole("ADMIN")
    		.antMatchers("/info", "/health").authenticated()
    		.anyRequest().denyAll()
            .and().csrf().disable();
    }
}