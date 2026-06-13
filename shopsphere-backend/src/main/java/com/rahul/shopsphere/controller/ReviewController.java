package com.rahul.shopsphere.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.dto.ReviewRequest;
import com.rahul.shopsphere.entity.Review;
import com.rahul.shopsphere.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/product/{productId}")
    public Review addReview(
            @PathVariable Long productId,
            @RequestBody ReviewRequest request,
            Authentication authentication
    ) {
        return reviewService.addReview(
                authentication.getName(),
                productId,
                request
        );
    }

    @GetMapping("/product/{productId}")
    public List<Review> getProductReviews(
            @PathVariable Long productId
    ) {
        return reviewService.getProductReviews(productId);
    }
}