package com.rahul.shopsphere.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.dto.AdminAnalyticsResponse;
import com.rahul.shopsphere.service.AdminAnalyticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
public class AdminAnalyticsController {

    private final AdminAnalyticsService adminAnalyticsService;

    @GetMapping("/dashboard")
    public AdminAnalyticsResponse getDashboardAnalytics() {
        return adminAnalyticsService.getDashboardAnalytics();
    }
}