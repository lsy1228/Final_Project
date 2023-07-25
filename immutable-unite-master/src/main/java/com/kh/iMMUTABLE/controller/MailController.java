package com.kh.iMMUTABLE.controller;

import com.kh.iMMUTABLE.service.MailSendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MailController {
    // 이메일 인증
    private final MailSendService mailService;
    @GetMapping("/email") // getMapping어노테이션을 사용해 /mail요청을 받음
    public ResponseEntity<String> MailSend(@RequestParam String email){
        // 파라미터로 넘어온 이메일 주소를 받음
//        System.out.println("메일 인증 호출 : " + email);
        int number = mailService.sendMail(email); // 랜덤한 숫자를 생성
        String num = "" + number; // number를 문자열로 형 변환

        return new ResponseEntity<>(num, HttpStatus.OK);
        // ResponseEntity 클라이언트에게 응답을 보낼 때 사용하는 객체
    }


    // 메일인증코드 확인
    @PostMapping("/verify") // 주소창에 인증코드가 뜨지 않기 위해 post 방식 사용
    public ResponseEntity<Boolean> verifyCode(@RequestBody Map<String, String> mailData) {
        String email = mailData.get("email"); //키 값이 입력되어 value 값을 출력 할 수 있다.
        int code = Integer.parseInt(mailData.get("code")) ;
        System.out.println("메일 : " + email + ", 코드" + code);
        boolean isTrue = mailService.verifyCode(email, code);
        return new ResponseEntity<>(isTrue, HttpStatus.OK);
    }

}