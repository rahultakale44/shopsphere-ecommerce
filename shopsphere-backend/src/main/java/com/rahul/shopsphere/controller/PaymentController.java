package com.rahul.shopsphere.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.rahul.shopsphere.dto.PaymentOrderResponse;
import com.rahul.shopsphere.dto.PaymentVerifyRequest;
import com.rahul.shopsphere.service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order/{orderId}")
    public PaymentOrderResponse createPaymentOrder(
            @PathVariable Long orderId,
            Authentication authentication
    ) throws Exception {
        return paymentService.createPaymentOrder(
                authentication.getName(),
                orderId
        );
    }

    @PostMapping("/verify")
    public String verifyPayment(
            @RequestBody PaymentVerifyRequest request
    ) throws Exception {
        return paymentService.verifyPayment(request);
    }
}