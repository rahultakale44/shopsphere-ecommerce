package com.rahul.shopsphere.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);
}