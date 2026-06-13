package com.rahul.shopsphere.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.rahul.shopsphere.dto.PaymentOrderResponse;
import com.rahul.shopsphere.dto.PaymentVerifyRequest;
import com.rahul.shopsphere.entity.Order;
import com.rahul.shopsphere.entity.OrderStatus;
import com.rahul.shopsphere.entity.Payment;
import com.rahul.shopsphere.entity.PaymentStatus;
import com.rahul.shopsphere.repository.OrderRepository;
import com.rahul.shopsphere.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderRepository orderRepository;
    private final PaymentRepository paymentRepository;

    public PaymentOrderResponse createPaymentOrder(String email, Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to pay for this order");
        }

        String dummyPaymentOrderId = "TEST_ORDER_" + order.getId() + "_" + System.currentTimeMillis();

        Payment payment = Payment.builder()
                .order(order)
                .razorpayOrderId(dummyPaymentOrderId)
                .amount(order.getTotalAmount())
                .status(PaymentStatus.CREATED)
                .createdAt(LocalDateTime.now())
                .build();

        paymentRepository.save(payment);

        return PaymentOrderResponse.builder()
                .orderId(order.getId())
                .razorpayOrderId(dummyPaymentOrderId)
                .amount(order.getTotalAmount())
                .currency("INR")
                .keyId("DUMMY_TEST_KEY")
                .build();
    }

    public String verifyPayment(PaymentVerifyRequest request) {

        Payment payment = paymentRepository.findByRazorpayOrderId(
                request.getRazorpayOrderId()
        ).orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
        payment.setRazorpaySignature(request.getRazorpaySignature());
        payment.setStatus(PaymentStatus.SUCCESS);

        Order order = payment.getOrder();
        order.setStatus(OrderStatus.CONFIRMED);

        orderRepository.save(order);
        paymentRepository.save(payment);

        return "Dummy payment verified successfully";
    }
}