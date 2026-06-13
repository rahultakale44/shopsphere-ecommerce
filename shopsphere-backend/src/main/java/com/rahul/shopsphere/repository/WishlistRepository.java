package com.rahul.shopsphere.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.entity.User;
import com.rahul.shopsphere.entity.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    List<Wishlist> findByUser(User user);

    Optional<Wishlist> findByUserAndProduct(User user, Product product);

    void deleteByUserAndProduct(User user, Product product);
}