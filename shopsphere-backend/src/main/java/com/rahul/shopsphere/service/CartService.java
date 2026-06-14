package com.rahul.shopsphere.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.rahul.shopsphere.dto.CartItemResponse;
import com.rahul.shopsphere.dto.CartResponse;
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

    public Cart getUserCartEntity(String email) {
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

    public CartResponse getUserCart(String email) {
        Cart cart = getUserCartEntity(email);
        return mapToCartResponse(cart);
    }

    public CartResponse addToCart(String email, Long productId) {
        return addToCart(email, productId, 1);
    }

    public CartResponse addToCart(String email, Long productId, int quantity) {
        if (quantity < 1) {
            throw new RuntimeException("Quantity must be at least 1");
        }

        Cart cart = getUserCartEntity(email);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .price(product.getDiscountPrice() != null
                            ? product.getDiscountPrice()
                            : product.getPrice())
                    .build();
        }

        cartItemRepository.save(cartItem);

        Cart updatedCart = getUserCartEntity(email);
        return mapToCartResponse(updatedCart);
    }

    public CartResponse updateCartItemQuantity(String email, Long cartItemId, int quantity) {
        Cart cart = getUserCartEntity(email);

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item not found");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }

        Cart updatedCart = getUserCartEntity(email);
        return mapToCartResponse(updatedCart);
    }

    public String removeCartItem(Long cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItemRepository.delete(cartItem);
        return "Item removed from cart";
    }

    private CartResponse mapToCartResponse(Cart cart) {
        List<CartItemResponse> itemResponses = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        if (cart.getCartItems() != null) {
            for (CartItem item : cart.getCartItems()) {
                BigDecimal itemTotal = item.getPrice()
                        .multiply(BigDecimal.valueOf(item.getQuantity()));

                totalAmount = totalAmount.add(itemTotal);

                itemResponses.add(
                        CartItemResponse.builder()
                                .cartItemId(item.getId())
                                .productId(item.getProduct().getId())
                                .productName(item.getProduct().getName())
                                .brand(item.getProduct().getBrand())
                                .imageUrl(item.getProduct().getImageUrl())
                                .quantity(item.getQuantity())
                                .price(item.getPrice())
                                .totalPrice(itemTotal)
                                .build()
                );
            }
        }

        return CartResponse.builder()
                .cartId(cart.getId())
                .items(itemResponses)
                .totalAmount(totalAmount)
                .build();
    }
}