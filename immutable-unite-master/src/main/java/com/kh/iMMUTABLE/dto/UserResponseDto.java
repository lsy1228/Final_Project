package com.kh.iMMUTABLE.dto;

import com.kh.iMMUTABLE.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDto {
    private String userEmail;
    private String userPassword;

    public static UserResponseDto of(Users user) {
        return UserResponseDto.builder()
                .userEmail(user.getUserEmail())
                .userPassword(user.getUserPwd())
                .build();
    }
}
