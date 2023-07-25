package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordRepository extends JpaRepository<Users, Long>  {
//    @Query(value = "update users  set userPwd = :password")
//    List<User> findByUsers(@Param("password") String password);
}
