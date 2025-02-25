package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject Bcrypt Encoder

    public User registerUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            throw new RuntimeException("Username already exists!");
        }
        String encodedPassword = passwordEncoder.encode(password);

        // Debugging print statement
        System.out.println("REGISTER: Username: " + username + ", Encrypted Password: " + encodedPassword);

        User user = new User(username, encodedPassword);
        return userRepository.save(user);
    }

    // ✅ ADD THIS METHOD TO HANDLE LOGIN
    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            System.out.println("LOGIN FAILED: Username not found!");
            return false;
        }

        // Debugging print statements
        System.out.println("LOGIN ATTEMPT: Entered Password: " + password);
        System.out.println("STORED HASH: " + user.getPassword());

        boolean matches = passwordEncoder.matches(password, user.getPassword());

        if (!matches) {
            System.out.println("LOGIN FAILED: Password mismatch!");
        }

        return matches;
    }
}
