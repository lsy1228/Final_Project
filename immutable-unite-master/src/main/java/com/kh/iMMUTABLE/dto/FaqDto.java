package com.kh.iMMUTABLE.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class FaqDto {
    private Long faqId;
    private String title;
    private String content;
    private LocalDateTime faqDate;
}
