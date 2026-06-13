package com.rahul.shopsphere.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.entity.User;
import com.rahul.shopsphere.entity.Wishlist;
import com.rahul.shopsphere.repository.ProductRepository;
import com.rahul.shopsphere.repository.UserRepository;
import com.rahul.shopsphere.repository.WishlistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public Wishlist addToWishlist(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return wishlistRepository.findByUserAndProduct(user, product)
                .orElseGet(() -> {
                    Wishlist wishlist = Wishlist.builder()
                            .user(user)
                            .product(product)
                            .createdAt(LocalDateTime.now())
                            .build();

                    return wishlistRepository.save(wishlist);
                });
    }

    public List<Wishlist> getWishlist(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return wishlistRepository.findByUser(user);
    }

    @Transactional
    public String removeFromWishlist(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        wishlistRepository.deleteByUserAndProduct(user, product);

        return "Product removed from wishlist";
    }
}