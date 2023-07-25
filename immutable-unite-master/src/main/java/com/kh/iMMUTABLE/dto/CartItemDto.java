package com.kh.iMMUTABLE.dto;

import com.kh.iMMUTABLE.constant.SizeStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Enumerated;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private long cartItemId;

    private String productName;

    private long productPrice;

    private int count;

    private String productImgFst;

    private long userId;

    private long setOriginProductPrice;


    private long cartId;

    @Enumerated
    private SizeStatus sizeStatus;

}

