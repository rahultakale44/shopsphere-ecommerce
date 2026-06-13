package com.rahul.shopsphere.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.entity.Wishlist;
import com.rahul.shopsphere.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @PostMapping("/add/{productId}")
    public Wishlist addToWishlist(
            @PathVariable Long productId,
            Authentication authentication
    ) {
        return wishlistService.addToWishlist(
                authentication.getName(),
                productId
        );
    }

    @GetMapping
    public List<Wishlist> getWishlist(
            Authentication authentication
    ) {
        return wishlistService.getWishlist(
                authentication.getName()
        );
    }

    @DeleteMapping("/remove/{productId}")
    public String removeFromWishlist(
            @PathVariable Long productId,
            Authentication authentication
    ) {
        return wishlistService.removeFromWishlist(
                authentication.getName(),
                productId
        );
    }
}