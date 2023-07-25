package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.CartItemDto;
import com.kh.iMMUTABLE.dto.OrderDto;
import com.kh.iMMUTABLE.entity.Cart;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.repository.CartItemRepository;
import com.kh.iMMUTABLE.service.CartOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequestMapping("/order")
@RequiredArgsConstructor

public class CartOrderController {
    private final CartOrderService cartOrderService;

    // order에 저장
    @PostMapping  ("/cartOrder")
    public ResponseEntity<Boolean> orderCart (@RequestBody Map<String, String> saveOrder) {
        long cartId = Long.parseLong(saveOrder.get("cartId"));
        String userName = saveOrder.get("inputName");
        String userEmail = saveOrder.get("inputEmail");
        String userPhone = saveOrder.get("inputPhone");
        String userAddr = saveOrder.get("addr");
        boolean result = cartOrderService.cartOrder(cartId, userName, userEmail, userPhone, userAddr);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // order 페이지에 장바구니에서 가져온 목록 띄우기
    @GetMapping("/cartOrderList")
    public ResponseEntity<List<CartItemDto>> cartOrderList (@RequestParam String cartId) {
        List<CartItemDto> result = cartOrderService.cartOrderList(Long.parseLong(cartId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // order 리스트
    @GetMapping ("/orderList")
    public ResponseEntity<List<OrderDto>> orderList (@RequestParam String cartId) {
        List<OrderDto> result = cartOrderService.orderList(Long.parseLong(cartId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // total price 들고오기
    @GetMapping("/totalPrice")
    public ResponseEntity<Integer> cartOrderTotalPrice (@RequestParam String cartId) {
        int result = cartOrderService.getTotalPrice(Long.parseLong(cartId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 주문하는 사람 정보 가져오기
    @GetMapping ("/orderGetUser")
    public ResponseEntity<UserDto> orderUser (@RequestParam String cartId) {
        UserDto result = cartOrderService.orderGetUser(Long.parseLong(cartId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 주문내역 가져오기
    @GetMapping("/orderHistory")
    public ResponseEntity<List<OrderDto>> orderHistory (@RequestParam String userEmail) {
        List<OrderDto> result = cartOrderService.orderHistory(userEmail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
