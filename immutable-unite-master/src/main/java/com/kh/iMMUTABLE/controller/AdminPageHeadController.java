package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.OrderDto;
import com.kh.iMMUTABLE.dto.QnaDto;
import com.kh.iMMUTABLE.entity.Order;
import com.kh.iMMUTABLE.entity.Qna;
import com.kh.iMMUTABLE.service.OrderService;
import com.kh.iMMUTABLE.service.QnaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/adminPage")
@RequiredArgsConstructor
public class AdminPageHeadController {
    private final OrderService orderService;
    private final QnaService qnaService;
    //신규 주문건 확인
    @PostMapping("/newOrderList")
    public ResponseEntity<List<OrderDto>> newOrderList(@RequestBody Map<String, String> orderData){
        String orderStatus = orderData.get("orderStatus");
        System.out.println(orderStatus);
        List<OrderDto> list = orderService.getStatusOrderList(orderStatus);
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //배송중 주문건 확인
    @PostMapping("/shipOrderList")
    public ResponseEntity<List<OrderDto>> shipOrderList(@RequestBody Map<String, String> orderData){
        String orderStatus = orderData.get("orderStatus");
        List<OrderDto> list = orderService.getStatusOrderList(orderStatus);
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    //신규 Qna 확인
    @PostMapping("/qnaLoadList")
    public ResponseEntity<List<QnaDto>> newQnaList(@RequestBody Map<String, String> qnaData){
        String qnaStatus = qnaData.get("qnaStatus");
        System.out.println(qnaStatus);
        List<QnaDto> list = qnaService.getStatusQnaList(qnaStatus);
        System.out.println("adminController :" + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
