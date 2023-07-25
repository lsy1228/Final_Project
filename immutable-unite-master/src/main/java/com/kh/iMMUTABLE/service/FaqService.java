package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.constant.Authority;
import com.kh.iMMUTABLE.dto.FaqDto;
import com.kh.iMMUTABLE.entity.Faq;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.repository.FaqRepository;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class FaqService {
    private final FaqRepository faqRepository;
    private final UserRepository userRepository;

    // faq 업로드
    public boolean faqUpload(String faqTitle, String faqContent, LocalDateTime faqDate){
        Faq faq = new Faq();
        faq.setFaqTitle(faqTitle);
        faq.setFaqContent(faqContent);
        faq.setFaqDate(faqDate);
        Faq uploadFaq = faqRepository.save(faq);
        return true;
    }

    //faq 목록 가져오기
    public List<Faq> faqList() {
        List<Faq> faqList = faqRepository.findAll();
        List<FaqDto> result = new ArrayList<>();
        for(Faq faq : faqList) {
            FaqDto faqDto = new FaqDto();
            faqDto.setTitle(faq.getFaqTitle());
            faqDto.setContent(faq.getFaqContent());
            faqDto.setFaqDate(faq.getFaqDate());
            result.add(faqDto);
        }
        return faqList;
    }

    //faq 삭제
    public boolean faqDelete(Long faqId) {
        System.out.println(faqId);
        faqRepository.deleteById(faqId);
        return true;
    }

    // faq 수정
    public boolean faqEdit(String faqId,String faqTitle, String faqContent, LocalDateTime faqDate) {
        try {
            Faq faq = faqRepository.findByFaqId(Long.valueOf(faqId));
            if (faq == null) {
                return false;
            }
            faq.setFaqId(Long.parseLong(faqId));
            faq.setFaqTitle(faqTitle);
            faq.setFaqContent(faqContent);
            faq.setFaqDate(faqDate);
            faqRepository.save(faq);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    //faq id로 목록 가져오기
    public FaqDto faqIdList(Long faqId) {
        Faq faqIdList = faqRepository.findByFaqId(faqId);
        FaqDto faqDto = new FaqDto();
        faqDto.setFaqId(faqIdList.getFaqId());
        faqDto.setTitle(faqIdList.getFaqTitle());
        faqDto.setContent(faqIdList.getFaqContent());
        faqDto.setFaqDate(faqIdList.getFaqDate());
        return faqDto;
    }

    //role_admin일때 글쓰기/수정 가능
    public boolean isAdmin(String userEmail) {
        Users users = userRepository.findByUserEmail(userEmail);
        if (users != null) {
            log.info(String.valueOf(users.getAuthority()));
            return users.getAuthority().equals(Authority.ROLE_ADMIN);
        }
        return false;
    }
}
