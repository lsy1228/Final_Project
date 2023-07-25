package com.kh.iMMUTABLE.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MailDto {
    private String receiver; // 받는사람
    private String title; // 제목
    private String content; // 내용
}
