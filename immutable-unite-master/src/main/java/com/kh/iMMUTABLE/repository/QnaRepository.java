package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.constant.QnaStatus;
import com.kh.iMMUTABLE.entity.Qna;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    Qna findByQnaId(Long qnaId);

    List<Qna> findByQnaStatus(QnaStatus qnaStatus);

}


