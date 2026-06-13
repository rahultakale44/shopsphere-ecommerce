package com.rahul.shopsphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.entity.Review;
import com.rahul.shopsphere.entity.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByProduct(Product product);

    Optional<Review> findByUserAndProduct(User user, Product product);
}