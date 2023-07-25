package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.constant.OrderStatus;
import com.kh.iMMUTABLE.dto.OrderDto;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.repository.OrderRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    //모든 주문건 가져오기
    public List<OrderDto> getOrderListAll() {
        List<Order> orderList = orderRepository.findAll();
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Order order : orderList){
            OrderDto orderDto = new OrderDto();
            orderDto.setOrderId(order.getOrderId());
            orderDto.setUserId(order.getUser().getUserId());
            orderDto.setOrderAddress(order.getOrderAddress());
            orderDto.setOrderDate(order.getOrderDate());
            orderDto.setTotalPrice(order.getTotalPrice());
            orderDto.setProductName(order.getProductName());
            orderDto.setProductColor(order.getProductColor());
            orderDto.setProductSize(order.getSizeStatus().toString());
            orderDto.setOrderStatus(order.getOrderStatus());
            orderDto.setShipCompany(order.getShipCompany());
            orderDto.setShipCode(order.getShipCode());
            orderDtos.add(orderDto);
        }
        return orderDtos;
    }
    //주문상태 업로드하기
    public boolean upLoadData(int orderId,String orderStatue,long shipCode, String orderShipCompany) {
        System.out.println("서비스 : " +  orderId);
        System.out.println("서비스 : " +  orderStatue);
        Order order = orderRepository.findByOrderId(orderId);
        order.setOrderStatus(OrderStatus.valueOf(orderStatue));
        order.setShipCode(shipCode);
        order.setShipCompany(orderShipCompany);
        orderRepository.save(order);
        return true;
    }
    //주문 상태를 찾는 리스트
    public List<OrderDto> getStatusOrderList(String orderStatus){
        List<Order> orderList = orderRepository.findByOrderStatus(OrderStatus.valueOf(orderStatus));
        List<OrderDto> orderDtos = new ArrayList<>();
        for(Order order : orderList){
            OrderDto orderDto = new OrderDto();
            orderDto.setOrderId(order.getOrderId());
            orderDtos.add(orderDto);
        }
        return orderDtos;
    }
    //날짜별 주문 건 토탈가격과 주문건수 구하기
    public List<Integer> getDateOrderList(String orderDate){
        List<Order> orderList = orderRepository.findByOrderDate(LocalDate.parse(orderDate));
        int listLangth = 0;
        int totalPrice = 0;
        List<Integer> result = new ArrayList<>();
        for(Order order : orderList) {
            totalPrice += order.getTotalPrice();
            listLangth++;
        }
        result.add(listLangth);
        result.add(totalPrice);
        return result;
    }

}
