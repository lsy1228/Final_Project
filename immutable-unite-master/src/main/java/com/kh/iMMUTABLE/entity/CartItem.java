package com.kh.iMMUTABLE.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "cart_item")
@Getter @Setter @ToString
public class CartItem {
    @Id
    @Column(name = "cart_item_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long cartItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private int cartPrice;

    private int count;





//    public static CartItem createCartItem(Cart cart,Product product,int count){
//        CartItem cartItem = new CartItem();
//        cartItem.setCart(cart);
//        cartItem.setProduct(product);
//        cartItem.setCount(count);
//
//        return cartItem;
//    }
//
//    // 장바구니에 담을 상품 수량 증가
//    public void addCount(int count){
//        this.count += count;
//    }
//
//    // 장바구니에 담을 수량 반영
//    public void updateCount(int count){
//        this.count = count;
//    }


}
