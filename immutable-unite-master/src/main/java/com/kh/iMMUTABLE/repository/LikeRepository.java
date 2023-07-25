package com.kh.iMMUTABLE.repository;

import com.kh.iMMUTABLE.entity.Like;
import com.kh.iMMUTABLE.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Like findByUserUserIdAndProductProductId(long userId, long productId);
    boolean existsByUserUserIdAndProductProductId(long userId, long productId);
}
