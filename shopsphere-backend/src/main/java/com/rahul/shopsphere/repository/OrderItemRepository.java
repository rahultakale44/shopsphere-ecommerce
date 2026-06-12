package com.rahul.shopsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
