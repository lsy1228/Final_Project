package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.constant.Authority;
import com.kh.iMMUTABLE.entity.Faq;
import com.kh.iMMUTABLE.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {
    List<Faq> findAll();
    Faq findByFaqId(Long faqId);

}
