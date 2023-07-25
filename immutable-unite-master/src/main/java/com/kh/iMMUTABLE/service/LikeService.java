package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.dto.LikeDto;
import com.kh.iMMUTABLE.dto.ProductDto;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.Like;
import com.kh.iMMUTABLE.entity.Product;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.repository.LikeRepository;
import com.kh.iMMUTABLE.repository.ProductRepository;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public boolean likeInsert(String id, long productId) {
        Users user = userRepository.findByUserEmail(id);
        Product product = productRepository.findByProductId(productId);
        boolean isLiked = likeRepository.existsByUserUserIdAndProductProductId(user.getUserId(), productId);
        if (isLiked) {
            return false;
        } else {
            Like like = new Like();
            like.setUser(user);
            like.setProduct(product);
            Like saveLike = likeRepository.save(like);
            return true;
        }
    }

    public List<LikeDto> likeList(String id) {
        System.out.println("서비스좋아요아이디 : " + id);
        Users user = userRepository.findByUserEmail(id);
        List<Like> likeList = user.getLikes();

        List<LikeDto> likeDtoList = new ArrayList<>();
        for(Like like : likeList) {
            LikeDto likeDto = new LikeDto();
            likeDto.setLikeId(like.getLike_id());
            likeDto.setProductId(like.getProduct().getProductId());
            likeDto.setUserId(like.getUser().getUserId());

            Product product = productRepository.findByProductId(like.getProduct().getProductId());
            likeDto.setProductName(product.getProductName());
            likeDto.setProductPrice(product.getProductPrice());
            likeDto.setProductImgFst(product.getProductImgFst());
            likeDtoList.add(likeDto);
        }
        return likeDtoList;
    }

    public boolean likeDelete (String id, long productId) {
        Users user = userRepository.findByUserEmail(id);
        Like like = likeRepository.findByUserUserIdAndProductProductId(user.getUserId() , productId);
        if(like!= null) {
            likeRepository.delete(like);
            return true;
        }
        return false;
    }

    public boolean likeView (String id, long productId) {
        Users user = userRepository.findByUserEmail(id);
        if(user == null) {
            return false;
        }
        return likeRepository.existsByUserUserIdAndProductProductId(user.getUserId(), productId);
    }
}
