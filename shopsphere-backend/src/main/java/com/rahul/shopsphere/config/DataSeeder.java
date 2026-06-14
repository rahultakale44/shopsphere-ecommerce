package com.rahul.shopsphere.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.rahul.shopsphere.entity.Product;
import com.rahul.shopsphere.repository.ProductRepository;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedProducts(ProductRepository productRepository) {
        return args -> {

            if (productRepository.count() > 0) {
                return;
            }

            List<Product> products = List.of(

                    Product.builder()
                            .name("Sony WH-1000XM5 Wireless Headphones")
                            .brand("SONY")
                            .price(new BigDecimal("39999"))
                            .discountPrice(new BigDecimal("32999"))
                            .description("Premium noise cancelling headphones")
                            .stockQuantity(50)
                            .imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e")
                            .active(true)
                            .build(),

                    Product.builder()
                            .name("Apple MacBook Air M3 13-inch")
                            .brand("APPLE")
                            .price(new BigDecimal("119900"))
                            .discountPrice(new BigDecimal("109900"))
                            .description("Apple MacBook Air M3")
                            .stockQuantity(25)
                            .imageUrl("https://images.unsplash.com/photo-1517336714739-489689fd1ca8")
                            .active(true)
                            .build(),

                    Product.builder()
                            .name("Nike Air Zoom Pegasus 40")
                            .brand("NIKE")
                            .price(new BigDecimal("15000"))
                            .discountPrice(new BigDecimal("12999"))
                            .description("Running shoes")
                            .stockQuantity(100)
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff")
                            .active(true)
                            .build(),

                    Product.builder()
                            .name("Levi's 511 Slim Fit Jeans")
                            .brand("LEVIS")
                            .price(new BigDecimal("6999"))
                            .discountPrice(new BigDecimal("5999"))
                            .description("Slim fit jeans")
                            .stockQuantity(80)
                            .imageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d")
                            .active(true)
                            .build(),

                    Product.builder()
                            .name("Instant Pot Duo 7-in-1")
                            .brand("INSTANT POT")
                            .price(new BigDecimal("11999"))
                            .discountPrice(new BigDecimal("8999"))
                            .description("Pressure cooker")
                            .stockQuantity(40)
                            .imageUrl("https://images.unsplash.com/photo-1585515656973-7c6f2f9b8b4f")
                            .active(true)
                            .build()

            );

            productRepository.saveAll(products);

            System.out.println("✅ Products seeded successfully");
        };
    }
}