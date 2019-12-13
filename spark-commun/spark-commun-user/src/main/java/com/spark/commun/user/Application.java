package com.spark.commun.user;

import org.springframework.boot.SpringApplication;
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
		SparkApplication.showApplicationInfo(SpringApplication.run(Application.class, args));
	}
}
