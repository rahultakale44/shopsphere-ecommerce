package com.rahul.shopsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}