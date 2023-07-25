package com.kh.iMMUTABLE.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CartDto {
    private long cartItemId;

    private String productName;

    private long productPrice;

    private int count;

    private String productImgFst;

    private long userId;


}