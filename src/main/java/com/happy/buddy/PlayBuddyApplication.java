package com.happy.buddy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PlayBuddyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayBuddyApplication.class, args);
	}

}
