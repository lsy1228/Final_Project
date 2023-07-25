import React, { useContext } from 'react';
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";
import { UserContext } from '../context/UserInfo';

  //yarn add react-daum-postcode


const Body = styled.div`
  width: 400px;
  height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
    }


`
const PopupPostCode = (props) => {
	  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용

    const context = useContext(UserContext);
    const {setAddr} = context; 

    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          };
          if (data.buildingName !== '') {
              extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          };
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        };
        console.log(data);
        console.log(fullAddress);
        console.log(data.zonecode);
        setAddr(fullAddress);
        props.onClose();
    };
  
    return(
      <Body>
      <DaumPostcode  onComplete={handlePostCode} />
      </Body>
  )
}
 
export default PopupPostCode;