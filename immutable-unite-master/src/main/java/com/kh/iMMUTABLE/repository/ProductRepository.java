package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.constant.ProductSellStatus;
import com.kh.iMMUTABLE.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(long ProductId);

    List<Product> findByProductName(String ProductName);

    List<Product> findByProductSellStatus(ProductSellStatus sellStatus);

}
