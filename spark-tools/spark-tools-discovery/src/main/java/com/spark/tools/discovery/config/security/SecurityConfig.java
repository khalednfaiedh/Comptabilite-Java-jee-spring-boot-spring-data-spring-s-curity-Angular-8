/**
 * 
 */
package com.spark.tools.discovery.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

/**
 * Web Security Config
 */
@Configuration
@EnableWebSecurity
@Order(1)
@Import({ AdminSecurityConfig.class })
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private Environment env;
	
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
        	.inMemoryAuthentication()
        		.withUser(env.getProperty("security.user.name")).password(env.getProperty("security.user.password")).roles("CLIENT")
        	.and()
        		.withUser(env.getProperty("security.admin.name")).password(env.getProperty("security.admin.password")).roles("CLIENT", "ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
        	.and().authorizeRequests().antMatchers("/eureka/**").hasRole("CLIENT")
			.anyRequest().hasRole("ADMIN")
        	.and().httpBasic()
        	.and().csrf().disable();
    }

}
