package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
    List<Users> findByUserEmailAndUserPwd(String userEmail,String userPassword);

    Users findByUserEmail(String userEmail);


    Users findByUserId(long userId);

    boolean existsByUserEmail(String userEmail); // entity 이름과 같아야함, exists에 s 붙여주기
}
