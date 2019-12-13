package com.spark.commun.config;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.ApiSelectorBuilder;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger Configuration
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {

	/**
	 * A builder which is intended to be the primary interface into the
	 * swagger-springmvc framework.<br>
	 * Provides sensible defaults and convenience methods for configuration.
	 * 
	 * @return Docket : API configuration of Swagger
	 */
	@Bean
	public Docket api() {
		Docket docket = apiSelectorBuilder().build();
		
		// Sets the api's meta information as included in the json ResourceListing response.
		docket.apiInfo(apiInfo());

		// make the documentation code generation friendly
		docket.forCodeGeneration(true);

		return docket;
	}

	/**
	 * Instruct Swagger to include only controllers from a particular package,
	 * with specific paths, using the ant() predicate.
	 * 
	 * @return ApiSelectorBuilder
	 */
	private ApiSelectorBuilder apiSelectorBuilder() {
		ApiSelectorBuilder apiSelectorBuilder = new Docket(DocumentationType.SWAGGER_2).select();
		apiSelectorBuilder.apis(RequestHandlerSelectors.basePackage("com.spark"));
		
		apiSelectorBuilder.apis(RequestHandlerSelectors.any());
		apiSelectorBuilder.paths(PathSelectors.any());
		return apiSelectorBuilder;
	}

	/**
	 * Swagger provides some default values in its response which you can
	 * customize, such as "Api Documentation", "Created by Contact Email",
	 * "Apache 2.0".
	 * 
	 * @return The ApiInfo class that contains custom information about the API
	 */
	@SuppressWarnings("rawtypes")
	private ApiInfo apiInfo() {
		String title = "SPARK API";
		String description = "SPARK Restfull Documentation";
		String version = "1.0.0";
		String termsOfServiceUrl = "Terms of service";
		//TODO à enrechir
		Contact contact = new Contact("Spark", "http://www.spark.com", "contact@spark.com");
		String license = "Spark API License";
		String licenseUrl = "API license URL";
		Collection<VendorExtension> vendorExtensions = new ArrayList<VendorExtension>();
		ApiInfo apiInfo = new ApiInfo(title, description, version, termsOfServiceUrl, contact, license, licenseUrl, vendorExtensions);
		return apiInfo;
	}
	
}
