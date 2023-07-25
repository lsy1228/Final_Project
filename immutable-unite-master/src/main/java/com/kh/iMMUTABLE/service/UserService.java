package com.kh.iMMUTABLE.service;

import com.kh.iMMUTABLE.constant.Authority;
import com.kh.iMMUTABLE.dto.UserDto;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    //고객 로그인 체크 값이 없으면 false를 리턴한다.
    public boolean getUserList(String userEmail, String userPassword){
        List<Users> userList = userRepository.findByUserEmailAndUserPwd(userEmail,userPassword);
        List<UserDto> userDtos = new ArrayList<>();
        for(Users user : userList){
            UserDto userDto = new UserDto();
            userDto.setUserEmail(user.getUserEmail());
            userDto.setUserPwd(user.getUserPwd());
            userDtos.add(userDto);
        }
        if(userDtos.isEmpty())return false;
        else return true;
    }

    public boolean getAdminList(String userEmail, String userPassword){
        List<Users> userList = userRepository.findByUserEmailAndUserPwd(userEmail,userPassword);
        List<UserDto> userDtos = new ArrayList<>();
        for(Users user : userList){
            UserDto userDto = new UserDto();
            userDto.setUserEmail(user.getUserEmail());
            userDto.setUserPwd(user.getUserPwd());
            userDto.setAuthority(user.getAuthority());
            userDtos.add(userDto);
        }
        if(userDtos.isEmpty())
            return false;
        else if(userDtos.get(0).getAuthority() == Authority.valueOf("ROLE_ADMIN"))
            return true;
        else return false;
    }

    public boolean userCheck(String userEmail) {
        boolean isEmail = userRepository.existsByUserEmail(userEmail);
        System.out.println("이메일 : " + userEmail);
        System.out.println(isEmail);
        return isEmail;
    }

    //고객 회원가입
    public boolean signUpUser(String userName, String userEmail, String userPwd, String userAddr,String userPhone){
        Users user = new Users();
        user.setUserName(userName);
        user.setUserEmail(userEmail);
        user.setUserPwd(userPwd);
        user.setUserAddr(userAddr);
        user.setUserPhone(userPhone);
        user.setUserDate(LocalDateTime.now());
        user.setAuthority(Authority.valueOf("ROLE_USER"));
        Users signUpUser = userRepository.save(user);
        return true;
    }

    //고객 삭제
    public boolean userDelete(String userId){
        System.out.println("유저서비스 : " + userId);
        userRepository.deleteById(Long.valueOf(userId));
        return true;
    }


    // 이메일 찾기
    public boolean searchUserEmail(String userEmail) {
        boolean isEmail = userRepository.existsByUserEmail(userEmail);
        log.debug("이메일 : " + userEmail);
        return isEmail;
    }

    // 비밀번호 재설정
    public boolean updateUserPassword(String userEmail, String newPassword) { // newPassword로 새로운 비밀번호 입력 받기
        log.debug("userEmail : " + userEmail);
        log.debug("newPassword : " + newPassword);
        Users user = userRepository.findByUserEmail(userEmail);
        if (user != null) {
            user.setUserPwd(newPassword);
            userRepository.save(user);
            return true; // 이메일로 조회한 사용자가 있으면 업데이트 진행
        }else {
            return false; // 없으면 진행 안됨
        }
    }

    // 회원 정보 수정
    public boolean saveUserInfo(String userEmail, String userName, String userPwd, String userPhone, String userAddr) {
        try {
            Users user = userRepository.findByUserEmail(userEmail);
            if(user == null) {
                return false;
            }
            user.setUserPhone(userPhone);
            user.setUserName(userName);
            user.setUserPwd(userPwd);
            user.setUserAddr(userAddr);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    // 회원 이미지정보 수정
    public boolean saveUserImgInfo(String userEmail, String userImg) {
        System.out.println("서비스 : " + userImg);
        Users user = userRepository.findByUserEmail(userEmail);
        user.setUserImg(userImg);
        userRepository.save(user);
        return true;
    }

    // 정보 가져오기
    public UserDto getUser(String userId) {
        Users users = userRepository.findByUserEmail(userId);
        UserDto userDto = new UserDto();
        userDto.setUserPhone(users.getUserPhone());
        userDto.setUserEmail(users.getUserEmail());
        userDto.setUserName(users.getUserName());
        userDto.setUserPwd(users.getUserPwd());
        userDto.setUserImg(users.getUserImg());
        userDto.setUserAddr(users.getUserAddr());
        return userDto;
    }

    // 회원 탈퇴
    public boolean memberSec(String userEmail) {
        Users user = userRepository.findByUserEmail(userEmail);
        if (user == null) {
            return false;
        }
        userRepository.delete(user);
        return true;
    }
    //주문한 사람 정보 가져오기
    public UserDto getOrderUser(String userId) {
        Users users = userRepository.findByUserEmail(userId);
        UserDto userDto = new UserDto();
        userDto.setUserPhone(users.getUserPhone());
        userDto.setUserEmail(users.getUserEmail());
        userDto.setUserName(users.getUserName());
        userDto.setUserAddr(users.getUserAddr());
        userDto.setAuthority(users.getAuthority());
        return userDto;
    }
}
