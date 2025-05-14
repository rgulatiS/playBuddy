package com.happy.buddy.controllers;
import com.happy.buddy.services.PhoneNumberAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;





    @RestController
    @RequestMapping("/api/auth")
    @CrossOrigin(origins = "*") // Allow CORS for frontend
    public class PhoneNumberAuthController {

        private final PhoneNumberAuthService authService;

        public PhoneNumberAuthController(PhoneNumberAuthService authService) {
            this.authService = authService;
        }

        @PostMapping("/send-otp")
        public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
            String phone = payload.get("phone");
            boolean sent = authService.sendOtp(phone);
            return ResponseEntity.ok(Map.of("success", sent, "message", "OTP sent (simulated)"));
        }

        @PostMapping("/verify-otp")
        public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> payload) {
            String phone = payload.get("phone");
            String otp = payload.get("otp");
            boolean verified = authService.verifyOtp(phone, otp);
            if (verified) {
                return ResponseEntity.ok(Map.of("success", true, "message", "OTP verified!"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Invalid OTP."));
            }
        }
    }

