/**
 * 
 */
package com.spark.tools.auth.config;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

/**
 * Server Discovery Config
 */
@Configuration
@EnableFeignClients("com.spark.tools.auth.client")
@EnableDiscoveryClient
public class ServiceDiscoveryConfig {

}
