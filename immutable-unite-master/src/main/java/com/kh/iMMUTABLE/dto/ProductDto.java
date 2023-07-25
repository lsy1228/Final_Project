package com.kh.iMMUTABLE.dto;

import com.kh.iMMUTABLE.constant.ProductSellStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ProductDto {
    private long productId;              // 상품코드 (PK)
    private String productName;         // 상품명
    private int productPrice;           // 상품가격
    private String productColor;
    private String productSize;
    private String productCategory;
    private long productStock;        // 상품재고
    private String productImgFst;      // 상품메인이미지1
    private String productImgSnd;      //상품메인이미지2
    private String productContent;       // 상품상세설명
    private String productImgDetail; //상세 이미지
    @Enumerated(EnumType.STRING)
    private ProductSellStatus productSellStatus;
}
