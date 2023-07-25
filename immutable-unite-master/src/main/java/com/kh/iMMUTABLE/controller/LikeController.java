package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.LikeDto;
import com.kh.iMMUTABLE.entity.Like;
import com.kh.iMMUTABLE.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/likeInsert")
    public ResponseEntity<Boolean> likeProduct (@RequestBody Map<String, String> likeData) {
        String id = likeData.get("id");
        long productId = Long.parseLong(likeData.get("productId"));
        System.out.println("컨트롤러 아이디" + id);
        System.out.println("컨트롤러 상품 아이디 : " + productId);
        boolean result = likeService.likeInsert(id, productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/likeList")
    public ResponseEntity<List<LikeDto>> likeList (@RequestParam String id) {
        String userEmail = id;
        System.out.println(userEmail);
        List<LikeDto> result = likeService.likeList(userEmail);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/likeDelete")
    public ResponseEntity<Boolean> dislikeProduct (@RequestBody Map<String, String> dislikeData) {
        String id = dislikeData.get("id");
        long productId = Long.parseLong(dislikeData.get("productId"));
        boolean result = likeService.likeDelete(id, productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/Heart")
    public ResponseEntity<Boolean> viewHeart (@RequestBody Map<String, String> heartData) {
        String id = heartData.get("id");
        long productId = Long.parseLong(heartData.get("productId"));
        System.out.println(id + " " + productId);
        boolean result = likeService.likeView(id, productId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
