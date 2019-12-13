package com.spark.commun;

import static java.lang.String.format;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.boot.SpringApplication;
import org.springframework.core.env.Environment;

import lombok.extern.slf4j.Slf4j;

/**
 * Main Application
 */
@Slf4j
public class SparkApplication {

	/**
	 * @param args
	 */
	public static void run(Object source, String... args) {
		Environment env = SpringApplication.run(source, args).getEnvironment();
		showApplicationInfo(env);
	}

	private static void showApplicationInfo(Environment env) {
		String protocol = "http";
		if (env.getProperty("server.ssl.key-store") != null) {
			protocol = "https";
		}
		try {
			log.info(
					"\n----------------------------------------------------------\n\t"
							+ "Application '{}' is running! Access URLs:\n\t" + "Local: \t\t{}://localhost:{}\n\t"
							+ "External: \t{}://{}:{}\n\t"
							+ "Profile(s): \t{}\n----------------------------------------------------------",
					env.getProperty("spring.application.name"), protocol, env.getProperty("server.port"), protocol,
					InetAddress.getLocalHost().getHostAddress(), env.getProperty("server.port"),
					env.getActiveProfiles());
		} catch (UnknownHostException e) {
			log.error(
					format("Cannot start %s due to: %s ", env.getProperty("spring.application.name"), e.getMessage()));
			System.exit(1);
		}
	}
}
