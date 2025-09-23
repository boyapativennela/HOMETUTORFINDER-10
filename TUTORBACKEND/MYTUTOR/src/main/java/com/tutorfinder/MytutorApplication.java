package com.tutorfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MytutorApplication {

	private static final Logger logger = LoggerFactory.getLogger(MytutorApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(MytutorApplication.class, args);
		System.out.println("Application is running ");
	}

}
