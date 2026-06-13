package com.rahul.shopsphere.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/products/page")
    public Page<Product> getProductsPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        return productService.getProductsPage(
                PageRequest.of(page, size, sort)
        );
    }

    @GetMapping("/products/search")
    public List<Product> searchProducts(
            @RequestParam String keyword
    ) {
        return productService.searchProducts(keyword);
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