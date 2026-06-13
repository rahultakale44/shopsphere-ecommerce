package com.rahul.shopsphere.dto;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentOrderResponse {

    private Long orderId;
    private String razorpayOrderId;
    private BigDecimal amount;
    private String currency;
    private String keyId;
}
