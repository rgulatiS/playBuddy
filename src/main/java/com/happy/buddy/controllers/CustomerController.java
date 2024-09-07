package com.happy.buddy.controllers;


import com.happy.buddy.entities.Customer;
import com.happy.buddy.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    public CustomerController() {}

    @GetMapping
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    @GetMapping("{id}")
    public Customer getCustomer(@PathVariable String id) throws Exception {
        return customerRepository.getReferenceById(Long.parseLong(id));
    }
}
