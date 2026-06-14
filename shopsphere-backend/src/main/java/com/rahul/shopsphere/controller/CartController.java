package com.rahul.shopsphere.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.dto.CartResponse;
import com.rahul.shopsphere.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartResponse getCart(Authentication authentication) {
        return cartService.getUserCart(authentication.getName());
    }

    @PostMapping("/add/{productId}")
    public CartResponse addToCart(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "1") int quantity,
            Authentication authentication
    ) {
        return cartService.addToCart(authentication.getName(), productId, quantity);
    }

    @PutMapping("/item/{cartItemId}")
    public CartResponse updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam int quantity,
            Authentication authentication
    ) {
        return cartService.updateCartItemQuantity(
                authentication.getName(),
                cartItemId,
                quantity
        );
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeFromCart(@PathVariable Long cartItemId) {
        return cartService.removeCartItem(cartItemId);
    }
}