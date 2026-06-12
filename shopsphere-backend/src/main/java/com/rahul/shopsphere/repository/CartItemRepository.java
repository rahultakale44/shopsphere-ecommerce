package com.rahul.shopsphere.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.Cart;
import com.rahul.shopsphere.entity.CartItem;
import com.rahul.shopsphere.entity.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}