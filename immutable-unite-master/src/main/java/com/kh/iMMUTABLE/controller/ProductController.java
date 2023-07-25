package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.entity.Product;
import com.kh.iMMUTABLE.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController // JSON 등 객체로 반환해준다
@Slf4j
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    // 제품 전체 조회 어드민페이지에서도 쓰여요!
    @GetMapping("/items")
    public ResponseEntity<List<ProductDto>> itemsList() {
        List<ProductDto> productDtos = productService.getProduct();
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }


    @GetMapping("/sellitems")
    public ResponseEntity<List<ProductDto>> sellitems() {
        List<ProductDto> sellProductDtos = productService.getSellProduct();
        return new ResponseEntity<>(sellProductDtos, HttpStatus.OK);
    }

    @PostMapping("/changImgFst")
    public ResponseEntity<Boolean> imgFstList(@RequestBody Map<String, String> imgFstData){
        long productId = Long.parseLong(imgFstData.get("productId"));
        String productImgFst = imgFstData.get("productImgFst");
        System.out.println("컨트롤러 : " + productId);
        System.out.println("컨트롤러 : " + productImgFst);
        boolean result = productService.getProductImgFst(productId,productImgFst);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/changImgSnd")
    public ResponseEntity<Boolean> imgSndList(@RequestBody Map<String, String> imgSndData){
        long productId = Long.parseLong(imgSndData.get("productId"));
        String productImgSnd = imgSndData.get("productImgSnd");
        System.out.println("컨트롤러 : " + productId);
        System.out.println("컨트롤러 : " + productImgSnd);
        boolean result = productService.getProductImgSnd(productId,productImgSnd);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/changImgDetail")
    public ResponseEntity<Boolean> imgDetailList(@RequestBody Map<String, String> imgSndData){
        long productId = Long.parseLong(imgSndData.get("productId"));
        String productDetail = imgSndData.get("productDetail");
        String productImgDetail = imgSndData.get("productImgDetail");
        System.out.println("컨트롤러 : " + productId);
        System.out.println("컨트롤러 : " + productImgDetail);
        boolean result = productService.getProductImgDetail(productId,productDetail,productImgDetail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @PostMapping("/changDetail")
    public ResponseEntity<Boolean> productDetailList(@RequestBody Map<String, String> productData){
        long productId = Long.parseLong(productData.get("productId"));
        long productStock = Long.parseLong(productData.get("productStock"));
        String productSellStatus = productData.get("productSellStatus");
        String productName = productData.get("productName");
        System.out.println("컨트롤러 : " + productId);
        System.out.println("컨트롤러 : " + productName);
        boolean result = productService.getProductDetail(productId,productStock,productSellStatus,productName);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/getProductData")
    public ResponseEntity<List<ProductDto>> getProductList(@RequestParam String productName) {
        String name = productName;
        System.out.println(name);
        List<ProductDto> productDtos = productService.getProductList(productName);
        return new ResponseEntity<>(productDtos, HttpStatus.OK);
    }

}
