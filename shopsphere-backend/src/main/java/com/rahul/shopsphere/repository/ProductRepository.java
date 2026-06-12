package com.rahul.shopsphere.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByActiveTrue();
}