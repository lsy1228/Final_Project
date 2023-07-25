package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.constant.Authority;
import com.kh.iMMUTABLE.dto.FaqDto;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.Faq;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.service.FaqService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController // JSON 등 객체로 반환해준다
@Slf4j
@RequestMapping("/faq")
@RequiredArgsConstructor
public class FaqController {
    private final FaqService faqService;

    // FAQ upload
    @PostMapping("/uploadFaq")
    public ResponseEntity<Boolean> uploadFaq (@RequestBody Map<String, String> faqData) {
        String faqTitle = faqData.get("faqTitle");
        String faqContent = faqData.get("faqContent");
        LocalDateTime faqDate = LocalDateTime.now();
        System.out.println(faqTitle);
        boolean result = faqService.faqUpload(faqTitle, faqContent, faqDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // faq 가져오기
    @GetMapping("/faqList")
    public ResponseEntity<List<Faq>> listFaq () {
        List<Faq> result = faqService.faqList();
        System.out.println(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // faq 삭제
    @PostMapping("/deleteFaq")
    public ResponseEntity<Boolean> faqDelete(@RequestBody Map <String, String> faqData){
        String faqId = faqData.get("faqId");
        boolean result = faqService.faqDelete(Long.valueOf(faqId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // faq 수정
    @PostMapping("/editFaq")
    public ResponseEntity<Boolean> editInfo(@RequestBody Map<String, String> faqData) {
        Long faqId = Long.valueOf(faqData.get("faqId"));
        String faqTitle = faqData.get("faqTitle");
        String faqContent = faqData.get("faqContent");
        LocalDateTime faqDate = LocalDateTime.now();
        System.out.println(faqId);
        boolean result = faqService.faqEdit(String.valueOf(faqId), faqTitle, faqContent, faqDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // faq id 가져오기
    @GetMapping("/faqIdList")
    public ResponseEntity<FaqDto> listFaq (@RequestParam String faqId) {
        FaqDto result = faqService.faqIdList(Long.valueOf(faqId));
        System.out.println(result);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // admin list 가져오기
    @GetMapping("/getAdmin")
    public ResponseEntity<Boolean> isAdmin(String userEmail) {
        boolean result = faqService.isAdmin(userEmail);
        log.info(String.valueOf(result));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
