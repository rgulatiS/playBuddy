package com.happy.buddy.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class PhoneNumberAuthService {
    private final Map<String, String> otpStore = new HashMap<>();
    private final Random random = new Random();

    public boolean sendOtp(String phone) {
        if (phone == null || phone.isBlank()) return false;

        String otp = String.format("%06d", random.nextInt(999999));
        otpStore.put(phone, otp);
        System.out.println("Generated OTP for " + phone + ": " + otp); // Simulate sending OTP
        return true;
    }

    public boolean verifyOtp(String phone, String otp) {
        if (!otpStore.containsKey(phone)) return false;
        String validOtp = otpStore.get(phone);
        boolean isValid = validOtp.equals(otp);
        if (isValid) otpStore.remove(phone); // One-time use
        return isValid;
    }
}
