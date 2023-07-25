package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.dto.TokenDto;
import com.kh.iMMUTABLE.dto.UserRequestDto;
import com.kh.iMMUTABLE.dto.UserResponseDto;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.jwt.TokenProvider;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    public UserResponseDto signup(UserRequestDto requestDto) {
        if (userRepository.existsByUserEmail(requestDto.getUserEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        System.out.println("서비스 사인업 requestDto: " + requestDto);
        Users user = requestDto.toUser(passwordEncoder);
        return UserResponseDto.of(userRepository.save(user));
    }

    //로그인시 TokenDto 를 반환한다.
    public TokenDto login(UserRequestDto requestDto) {
        System.out.println("토큰디티오 접속 완료");
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        System.out.println("authenticationToken : " + authenticationToken);
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        System.out.println("authentication" + authentication);
        return tokenProvider.generateTokenDto(authentication);
    }
}
