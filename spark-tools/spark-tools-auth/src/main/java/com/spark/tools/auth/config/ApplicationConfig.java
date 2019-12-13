package com.spark.tools.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Application Config
 */
@Configuration
public class ApplicationConfig {

	/**
	 * Object Mapper bean
	 * 
	 * @return
	 */
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}
}
