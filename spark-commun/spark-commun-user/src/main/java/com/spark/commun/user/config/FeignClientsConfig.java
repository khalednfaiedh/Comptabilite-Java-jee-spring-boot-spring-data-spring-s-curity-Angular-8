/**
 * 
 */
package com.spark.commun.user.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

/**
 * Feign Clients Config
 */
@Configuration
@EnableFeignClients("com.spark.commun.user.client")
public class FeignClientsConfig {

}
