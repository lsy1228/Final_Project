package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.constant.OrderStatus;
import com.kh.iMMUTABLE.dto.CartDto;
import com.kh.iMMUTABLE.dto.CartItemDto;
import com.kh.iMMUTABLE.dto.OrderDto;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.*;
import com.kh.iMMUTABLE.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class CartOrderService {
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    // 카트 제품 불러와서 확인
    public List<CartItemDto> cartOrderList(long cartId) {
        List<CartItem> cartItemList = cartItemRepository.findByCartCartId(cartId);
        List<CartItemDto> cartItemDtoList = new ArrayList<>();
        Optional<Cart> cart = cartRepository.findById(cartId);
        for(CartItem cartItem : cartItemList) {
            CartItemDto cartItemDto = new CartItemDto();
            cartItemDto.setProductName(cartItem.getProduct().getProductName());
            cartItemDto.setCount(cartItem.getCount());
            cartItemDto.setProductPrice(cartItem.getCartPrice());
            cartItemDto.setProductImgFst(cartItem.getProduct().getProductImgFst());
            cartItemDto.setSizeStatus(cartItem.getProduct().getSizeStatus());
            cartItemDtoList.add(cartItemDto);
        }
        return cartItemDtoList;
    }

    // order에 저장
    public boolean cartOrder(long cartId, String userName, String userEmail, String userPhone, String userAddr) {
        System.out.println(cartId);

        Optional<Cart> cart = cartRepository.findById(cartId); // 카트아이디로 해당되는 카트 찾음

        if (cart.isPresent()) {  // 카트가 존재하면
            for (CartItem cartItem : cart.get().getCartItemList()) { // 해당 카트에 있는 카트 아이템 가져옴
                Order order = new Order();  // Order 엔티티에 정보 저장하기 위해 생성
                order.setUser(cartItem.getCart().getUser());    // 주문 user
                order.setOrderDate(LocalDate.from(LocalDateTime.now()));    // 주문 날짜
                order.setCart(cart.get());  // 주문 장바구니
                order.setProductName(cartItem.getProduct().getProductName());   // 주문 제품 이름
                order.setProductColor(cartItem.getProduct().getProductColor()); // 주문 제품 컬러
                order.setProductPrice(cartItem.getCartPrice()); // 각 제품별 가격
                order.setTotalPrice(cart.get().getTotalPrice()); // 장바구니 총 가격
                order.setProduct(cartItem.getProduct());        // 주문 제품
                order.setOrderStatus(OrderStatus.CHECK);        // 주문 상태
                order.setSizeStatus(cartItem.getProduct().getSizeStatus()); // 주문 사이즈
                order.setCount(cartItem.getCount());

                order.setOrderAddress(userAddr);    // 주문하는 사람 주소
                order.setOrderName(userName);       // 주문하는 사람 이름
                order.setOrderPhone(userPhone);     // 주문하는 사람 전화번호
                order.setOrderEmail(userEmail);     // 주문하는 사람 이메일
                orderRepository.save(order);
            }
            cart.get().getCartItemList().clear();
            cartRepository.save(cart.get());
        }
        return true;
    }

    public List<OrderDto> orderList (long cartId) {
        List<Order> orderList = orderRepository.findByCartCartId(cartId);
        List<OrderDto> result = new ArrayList<>();

        for(Order order : orderList) {
            OrderDto orderDto = new OrderDto();
            orderDto.setOrderId(order.getOrderId());
            orderDto.setUserId(order.getUser().getUserId());
            orderDto.setOrderAddress(order.getOrderAddress());
            orderDto.setOrderDate(order.getOrderDate());
            orderDto.setOrderStatus(order.getOrderStatus());
            orderDto.setProductSize(order.getSizeStatus().toString());
            orderDto.setProductName(order.getProductName());
            orderDto.setProductImgFst(order.getProduct().getProductImgFst());
            orderDto.setProductPrice(order.getTotalPrice());
            orderDto.setTotalPrice(order.getCart().getTotalPrice());
            orderDto.setUserName(order.getUser().getUserName());
            orderDto.setUserEmail(order.getUser().getUserEmail());
            orderDto.setUserPhone(order.getUser().getUserPhone());
            result.add(orderDto);
        }
        return result;
    }

    // totalprice 가져오기
    public int getTotalPrice (long cartId) {
        Optional<Cart> cart = cartRepository.findById(cartId);
        int totalPrice = cart.get().getTotalPrice();
        return totalPrice;
    }

    public UserDto orderGetUser(long cartId) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if(cartOptional.isPresent()) {
            Cart cart = cartOptional.get();
            Users users = cart.getUser();

            UserDto userDto = new UserDto();
            userDto.setUserId(users.getUserId());
            userDto.setUserName(users.getUserName());
            userDto.setUserEmail(users.getUserEmail());
            userDto.setUserPhone(users.getUserPhone());
            userDto.setUserAddr(users.getUserAddr());
            return userDto;
        } else {
            throw new NoSuchElementException("cart not found");
        }
    }

    // 주문내역
    public List<OrderDto> orderHistory(String userEmil) {
        Users users = userRepository.findByUserEmail(userEmil);
        List<Order> orderList = orderRepository.findByUserUserId(users.getUserId());
        List<OrderDto> orderDtos = new ArrayList<>();

        for(Order order : orderList) {
            OrderDto orderDto = new OrderDto();
            orderDto.setProductName(order.getProductName());
            orderDto.setProductImgFst(order.getProduct().getProductImgFst());
            orderDto.setProductSize(order.getSizeStatus().toString());
            orderDto.setOrderId(order.getOrderId());
            orderDto.setProductId(order.getProduct().getProductId());
            orderDto.setProductPrice(order.getProductPrice());
            orderDto.setOrderDate(order.getOrderDate());
            orderDto.setReviewed(order.isReviewed());
            orderDto.setOrderStatus(order.getOrderStatus());
            orderDto.setShipCode(order.getShipCode());
            orderDto.setShipCompany(order.getShipCompany());
            orderDtos.add(orderDto);
        }
        return orderDtos;
    }
}
