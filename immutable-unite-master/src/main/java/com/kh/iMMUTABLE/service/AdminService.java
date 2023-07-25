package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.constant.Authority;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.Users;
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
public class AdminService {
    private final UserRepository userRepository;


    public List<UserDto> getUserListAll(){
        List<Users> userList = userRepository.findAll();
        List<UserDto> userDtos = new ArrayList<>();
        for(Users user : userList){
            UserDto userDto = new UserDto();
            userDto.setUserId(user.getUserId());
            userDto.setUserName(user.getUserName());
            userDto.setUserAddr(user.getUserAddr());
            userDto.setUserPhone(user.getUserPhone());
            userDto.setAuthority(user.getAuthority());
            userDtos.add(userDto);
        }
        System.out.println("adminService : " +userDtos.toString());
        return userDtos;
    }
}
