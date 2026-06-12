package com.rahul.shopsphere.service;

import java.time.LocalDateTime;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.rahul.shopsphere.entity.Cart;
import com.rahul.shopsphere.entity.CartItem;
import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.entity.User;
import com.rahul.shopsphere.repository.CartItemRepository;
import com.rahul.shopsphere.repository.CartRepository;
import com.rahul.shopsphere.repository.ProductRepository;
import com.rahul.shopsphere.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart getUserCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart cart = Cart.builder()
                            .user(user)
                            .createdAt(LocalDateTime.now())
                            .cartItems(new ArrayList<>())
                            .build();

                    return cartRepository.save(cart);
                });
    }

    public Cart addToCart(
            String email,
            Long productId
    ) {

        Cart cart = getUserCart(email);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = CartItem.builder()
                .cart(cart)
                .product(product)
                .quantity(1)
                .price(product.getDiscountPrice())
                .build();

        cartItemRepository.save(cartItem);

        cart.getCartItems().add(cartItem);

        return cartRepository.save(cart);
    }

    public String removeCartItem(Long cartItemId) {

        cartItemRepository.deleteById(cartItemId);

        return "Item removed from cart";
    }
}