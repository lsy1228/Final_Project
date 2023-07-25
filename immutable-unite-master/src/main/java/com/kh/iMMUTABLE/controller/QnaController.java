package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.dto.QnaDto;
import com.kh.iMMUTABLE.service.QnaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController // JSON 등 객체로 반환해준다
@Slf4j
@RequestMapping("/qna")
@RequiredArgsConstructor
public class QnaController {
    private final QnaService qnaService;

    // QnA 작성
    @PostMapping("/uploadQna")
    public ResponseEntity<Boolean> updateQna (@RequestBody Map<String, String> qnaData) {
        String userEmail = qnaData.get("userEmail");
        String productId = qnaData.get("productId");
        String qnaTitle = qnaData.get("qnaTitle");
        String qnaContent = qnaData.get("qnaContent");
        LocalDate nowDate = LocalDate.now();
        String qnaDateString = nowDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        LocalDate qnaDate = LocalDate.parse(qnaDateString);
        boolean result = qnaService.qnaUpload(userEmail ,productId, qnaTitle, qnaContent, qnaDate);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 제품 Qna
    @GetMapping("/qnaList")
    public ResponseEntity<List<QnaDto>> qnaList (@RequestParam String heartProductId) {
        System.out.println("확인 : " + heartProductId);
        List<QnaDto> qnaDtos = qnaService.getQna(heartProductId);
        return new ResponseEntity<>(qnaDtos, HttpStatus.OK);
    }

    // 나의 Qna
    @GetMapping("/myQnaList")
    public ResponseEntity<List<QnaDto>> myQnaList (@RequestParam String id) {
        System.out.println("마이qna : " + id);
        List<QnaDto> qnaDtos = qnaService.getMyQna(id);
        return new ResponseEntity<>(qnaDtos, HttpStatus.OK);
    }

    // 나의 Qna 수정 모달 제품 정보
    @GetMapping("/myQnaProductInfo")
    public ResponseEntity<ProductDto> myQnaProductInfo (@RequestParam long productId) {
        ProductDto productDto = qnaService.getMyQnaProductInfo(productId);
        return new ResponseEntity<>(productDto, HttpStatus.OK);
    }

    // 내가 쓴 Qna 내용 가져오기
    @GetMapping("/editViewMyQna")
    public ResponseEntity<QnaDto> editViewMyQna (@RequestParam long qnaId) {
        QnaDto qnaDto = qnaService.getMyQnaCon(qnaId);
        return new ResponseEntity<>(qnaDto, HttpStatus.OK);
    }

    // 나의 Qna 수정
    @PostMapping("/editMyQna")
    public ResponseEntity<Boolean> editMyQna (@RequestBody Map<String, String> editData) {
        String qnaId = editData.get("qnaId");
        String title = editData.get("title");
        String content = editData.get("content");
        boolean result = qnaService.editMyQna(qnaId, title, content);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 나의 Qna 삭제
    @PostMapping("/deleteMyQna")
    public ResponseEntity<Boolean> deleteMyQna (@RequestBody Map<String, String> deleteQna) {
        String qnaId = deleteQna.get("qnaId");
        boolean result = qnaService.deleteMyQna(qnaId);
        return  new ResponseEntity<>(result, HttpStatus.OK);
    }
}
