package com.spark.commun.config.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
/**
 * 
 * prePostEnabled :Determines if Spring Security’s pre post annotations [@PreAuthorize,@PostAuthorize,..] should be enabled.
 * 
 * @author jik
 *
 */
@Configuration
@EnableResourceServer
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class GlobalMethodSecurityConfig {

}
