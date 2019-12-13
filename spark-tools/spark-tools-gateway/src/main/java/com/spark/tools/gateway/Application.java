package com.spark.tools.gateway;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.spark.commun.SparkApplication;

/**
 * Main Application
 */
@SpringBootApplication
public class Application {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		SparkApplication.run(Application.class, args);
	}

}
