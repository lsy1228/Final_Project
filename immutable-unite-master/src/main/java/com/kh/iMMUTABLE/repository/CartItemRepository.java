package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Cart;
import com.kh.iMMUTABLE.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartCartId(long cartId);
    CartItem findByCartCartIdAndProductProductId(long cartId, long productId);

    CartItem findByCartItemId(long cartItemID);


}
