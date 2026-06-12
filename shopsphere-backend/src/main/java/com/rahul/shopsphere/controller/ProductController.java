package com.rahul.shopsphere.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/admin/products/category/{categoryId}")
    public Product createProduct(
            @PathVariable Long categoryId,
            @RequestBody Product product
    ) {
        return productService.createProduct(product, categoryId);
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product getProductById(
            @PathVariable Long id
    ) {
        return productService.getProductById(id);
    }

    @GetMapping("/products/category/{categoryId}")
    public List<Product> getProductsByCategory(
            @PathVariable Long categoryId
    ) {
        return productService.getProductsByCategory(categoryId);
    }

    @DeleteMapping("/admin/products/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {
        productService.deleteProduct(id);
        return "Product deleted successfully";
    }
}