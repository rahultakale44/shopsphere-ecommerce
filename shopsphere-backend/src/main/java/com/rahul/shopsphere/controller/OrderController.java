package com.rahul.shopsphere.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.entity.Order;
import com.rahul.shopsphere.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public Order placeOrder(Authentication authentication) {
        return orderService.placeOrder(authentication.getName());
    }

    @GetMapping
    public List<Order> getMyOrders(Authentication authentication) {
        return orderService.getUserOrders(authentication.getName());
    }
}