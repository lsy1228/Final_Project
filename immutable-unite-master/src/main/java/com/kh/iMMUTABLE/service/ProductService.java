package com.kh.iMMUTABLE.service;


import com.kh.iMMUTABLE.constant.OrderStatus;
import com.kh.iMMUTABLE.constant.ProductSellStatus;
import com.kh.iMMUTABLE.constant.SizeStatus;
import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.entity.Product;


import com.kh.iMMUTABLE.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ProductService {

    // 의존성을 통해 빈에 등록된 필드는 불변성이 있어야 하므로 final 선언을 해야 함
    private final ProductRepository productRepository;
    // 상품 정보를 조회하는 데이터 액세스 객체
    public List<ProductDto> getProduct() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : products) {
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setProductName(product.getProductName());
            productDto.setProductImgFst(product.getProductImgFst());
            productDto.setProductImgSnd(product.getProductImgSnd());
            productDto.setProductPrice(product.getProductPrice());
            productDto.setProductSize(product.getSizeStatus().toString()); //????
            productDto.setProductImgDetail(product.getProductImgDetail());
            productDto.setProductCategory(product.getProductCategory());
            productDto.setProductColor(product.getProductColor());
            productDto.setProductStock(product.getProductStock());
            productDto.setProductSellStatus(product.getProductSellStatus());
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public boolean itemUpLoad(String productName, String productPrice, String productColor, String productSize,String productCategory,String productImgFst,String productImgSnd,String productImgDetail) {
        Product product = new Product();
        product.setProductName(productName);
        product.setProductPrice(Integer.parseInt(productPrice));
        product.setProductColor(productColor);
        product.setSizeStatus(SizeStatus.valueOf(productSize));
        product.setProductCategory(productCategory);
        product.setProductImgFst(productImgFst);
        product.setProductImgSnd(productImgSnd);
        product.setProductImgDetail(productImgDetail);
        Product upLoadItem = productRepository.save(product);
        return true;
    }


    // SELL인 상품정보
    public List<ProductDto> getSellProduct() {
        List<Product> sellproducts = productRepository.findByProductSellStatus(ProductSellStatus.SELL);
        List<ProductDto> sellProductDtos = new ArrayList<>();
        for (Product product : sellproducts) {
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setProductName(product.getProductName());
            productDto.setProductImgFst(product.getProductImgFst());
            productDto.setProductImgSnd(product.getProductImgSnd());
            productDto.setProductPrice(product.getProductPrice());
            productDto.setProductContent(product.getProductDetail());
            productDto.setProductImgDetail(product.getProductImgDetail());
            productDto.setProductCategory(product.getProductCategory());
            productDto.setProductColor(product.getProductColor());
            productDto.setProductStock(product.getProductStock());
            productDto.setProductSellStatus(product.getProductSellStatus());
            productDto.setProductSize(product.getSizeStatus().toString());
            sellProductDtos.add(productDto);
        }
        return sellProductDtos;
    }

    //상품 첫번째 이미지 수정
    public boolean getProductImgFst(long ProductId , String productImgFst) {
        Product product = productRepository.findByProductId(ProductId);
        product.setProductImgFst(productImgFst);
        productRepository.save(product);
        return true;
    }
    //상품 두번째 이미지 수정
    public boolean getProductImgSnd(long ProductId , String productImgSnd) {
        Product product = productRepository.findByProductId(ProductId);
        product.setProductImgSnd(productImgSnd);
        productRepository.save(product);
        return true;
    }
    //상품 디테일 이미지 수정
    public boolean getProductImgDetail(long ProductId , String productDetail, String productImgDetail) {
        Product product = productRepository.findByProductId(ProductId);
        product.setProductDetail(productDetail);
        product.setProductImgDetail(productImgDetail);
        productRepository.save(product);
        return true;
    }
    //상품 디테일 내용 수정
    public boolean getProductDetail(long ProductId ,long productStock,String productSellStatus,String productName) {
        Product product = productRepository.findByProductId(ProductId);
        product.setProductStock(productStock);
        product.setProductSellStatus(ProductSellStatus.valueOf(productSellStatus));
        product.setProductName(productName);
        productRepository.save(product);
        return true;
    }
    public List<ProductDto> getProductList(String productName) {
        List<Product> products = productRepository.findByProductName(productName);
        System.out.println();
        List<ProductDto> productDtos = new ArrayList<>();
        for(Product product : products) {
            ProductDto productDto = new ProductDto();
            productDto.setProductId(product.getProductId());
            productDto.setProductName(product.getProductName());
            productDto.setProductColor(product.getProductColor());
            productDto.setProductSize(product.getSizeStatus().toString());
            productDto.setProductPrice(product.getProductPrice());
            productDto.setProductContent(product.getProductDetail());
            productDto.setProductImgFst(product.getProductImgFst());
            productDto.setProductImgSnd(product.getProductImgSnd());
            productDto.setProductImgDetail(product.getProductImgDetail());
            productDtos.add(productDto);
        }
        return productDtos;
    }
}
