package com.rahul.shopsphere.service;

import org.springframework.stereotype.Service;

import com.rahul.shopsphere.dto.AdminAnalyticsResponse;
import com.rahul.shopsphere.repository.OrderRepository;
import com.rahul.shopsphere.repository.ProductRepository;
import com.rahul.shopsphere.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminAnalyticsService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminAnalyticsResponse getDashboardAnalytics() {
        return AdminAnalyticsResponse.builder()
                .totalUsers(userRepository.count())
                .totalProducts(productRepository.count())
                .totalOrders(orderRepository.count())
                .totalRevenue(orderRepository.getTotalRevenue())
                .build();
    }
}