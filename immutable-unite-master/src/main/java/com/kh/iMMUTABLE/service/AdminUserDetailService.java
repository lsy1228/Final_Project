package com.kh.iMMUTABLE.service;
import com.kh.iMMUTABLE.entity.Users;
import com.kh.iMMUTABLE.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AdminUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        Users user = userRepository.findByUserEmail(userEmail);
        if (user != null) {
            return createUserDetails(user);
        } else {
            throw new UsernameNotFoundException(userEmail + " 을 DB에서 찾을 수 없습니다");
        }
    }

    private UserDetails createUserDetails(Users users) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(users.getAuthority().toString());

        return new User(
                String.valueOf(users.getUserId()),
                users.getUserPwd(),
                Collections.singleton(grantedAuthority)
        );
    }
}
