package com.rahul.shopsphere.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rahul.shopsphere.dto.ReviewRequest;
import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.entity.Review;
import com.rahul.shopsphere.entity.User;
import com.rahul.shopsphere.repository.ProductRepository;
import com.rahul.shopsphere.repository.ReviewRepository;
import com.rahul.shopsphere.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Review addReview(String email, Long productId, ReviewRequest request) {

        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = reviewRepository.findByUserAndProduct(user, product)
                .orElse(Review.builder()
                        .user(user)
                        .product(product)
                        .createdAt(LocalDateTime.now())
                        .build());

        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        updateProductAverageRating(product);

        return savedReview;
    }

    public List<Review> getProductReviews(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return reviewRepository.findByProduct(product);
    }

    private void updateProductAverageRating(Product product) {

        List<Review> reviews = reviewRepository.findByProduct(product);

        double averageRating = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);

        product.setRating(averageRating);
        productRepository.save(product);
    }
}