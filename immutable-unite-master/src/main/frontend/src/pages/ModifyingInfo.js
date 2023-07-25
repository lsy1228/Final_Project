import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PopupPostCode from "../api/PopupPostCode";
import { UserContext } from "../context/UserInfo";
import AxiosFinal from "../api/AxiosFinal";
import { Link, useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../adminPage/FireBase";

const Container = styled.div`
    width: 100%;
    display: flex;
    @media only screen and ( max-width: 430px){
        height: 100vh;
      }
`

const MainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and ( max-width: 430px){
        height: 100vh;
      }
`

const Logo = styled.div`
    width: 100%;

    a{
        text-decoration: none;
        color: black;
    }

    .logo{
        justify-content: center;
        align-items: center;
        display: flex;
        height: 70px;
        font-weight: bolder;
        font-size: 50px;
        @media only screen and ( max-width: 430px){
            font-size: 30px;
        }
    }
`

const Title = styled.div`
    width: 100%;
    margin-top: 50px;
    @media only screen and ( max-width: 430px){
        margin-top: 0%;
      }

    .ti{
        font-weight: bold;
        justify-content: center;
        align-items: center;
        display: flex;
        height: 20px;
    }

`

const Info = styled.div`
    margin-top: 20px;
    display: flex;
    width: 1000px;
    height: 120px;
    border: 1px solid #ccc;
    @media only screen and ( max-width: 430px){
        width: 430px;
      }

    input::placeholder{
            font-size: 5px;
        }

    .userInfo {
        margin-left: 10px;
        justify-content: center;
        align-items: center;
        display: flex;
    }


    .profileImg{
        border: 1px solid #ccc  ;
        border-radius: 50%;
        display: flex;
        width: 60px;
        height: 60px;
        @media only screen and ( max-width: 430px){
        width: 80px;
        height: 80px;
      }
    }

    .line{
        margin: 0px 10px 0px 10px;
        border-left: 1px solid #ccc;
        height: 60px;
        @media only screen and ( max-width: 430px){
            margin: 0;
            border: none;
      }
    }
    .content{
        display: flex;
        font-size: 12px;
        @media only screen and ( max-width: 430px){
            display: flex;
            margin-top: auto;
            width: 300px;
            align-items: center;
            justify-content: center;
        }

    }
    .profileChangBtn{
        border: 1px solid black;
        background-color: white;
        font-size: 11px;
        width: 100px;
        @media only screen and ( max-width: 430px){
            width: 100px;
            margin: 0px 40px 30px 200px;
            position: absolute;

        }
        &:hover{
            background-color: black;
            color: white;
        }

    }
    input{
      width: 110px;
      margin-right: 10px;
      @media only screen and ( max-width: 430px){
            width: 80px;
            margin: 0px 80px 30px 40px;
            position: absolute;
        }

      ::file-selector-button {
      margin-left: 10px;
      width: 100px;
      background: #fff;
      border: 1px solid black;
      font-size: 11px;
      @media only screen and ( max-width: 430px){
            width: 70px;
        }
      &:hover{
        background-color: black;
        color: white;
      }
    }
    }
`

const InnerContainer = styled.div`
    width: 1000px;
    height: 100%;
    margin-top: 30px;
  margin-left: 10%;
    @media only screen and ( max-width: 430px){
        width: 390px;
      }

    .info{
        width: 100px;
        float: left;

    }
    .info2{
        font-size: 12px;
        display: flex;
        width: 100px;
        float: right;
    }

    .btn{
        margin: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modify-btn{
        width: 300px;
        height: 40px;
        border: none;
        background-color: black;
        margin-right: 10px;
        color: white;
        font-size: 11px;
        :hover{
            color: #646166;
        }
        @media only screen and ( max-width: 430px){
        width: 100px;
      }
    }

    .cancle-btn{
        width: 300px;
        height: 40px;
        border: none;
        background-color: #ccc;
        margin-right: 10px;
        color: white;
        font-size: 11px;
        :hover{
            color: #646166;
        }
        @media only screen and ( max-width: 430px){
        width: 100px;

      }
    }
`

const Body = styled.div`
    display: flex;
    width: 1000px;
    @media only screen and ( max-width: 430px){
        width: 390px;
      }
    .input{
        flex-direction: column;
        margin-top: 10px;
        border-top: 2px solid #ccc;
        display: flex;
        width: 1000px;
        @media only screen and ( max-width: 430px){
        width: 430px;
        }

        input::placeholder{
            font-size: 6px;

        }


    }

    .item{
        padding: 18px 0px 15px 0px;
        border-bottom: 1px solid #ccc;
        display: flex;
        height: 20px;
        width: 1000px;
        @media only screen and ( max-width: 430px){
        width: 430px;
        }
    }

    label{
        font-size: 11px;
        width: 150px;
        display: flex;
        @media only screen and ( max-width: 430px){
            width: 140px;

        }
    }

    .hint{
        font-size: 10px;
        width: 250px;
        margin-top: auto;
        margin-left: 10px;
        @media only screen and ( max-width: 430px){
            position: absolute;
            margin: 20px 0px 0px 160px;
            width: 220px;
        }

    }


    Button{
        background-color: white;
        border: 1px solid #ccc;
        margin-left: 10px;
    }

    .addrBtn{
        font-size: 10px;
    }
`


const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    @media only screen and ( max-width: 430px){
        margin-bottom: 100px;
      }


    .foot{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8b9192;
        font-size: 13px;
        font-weight: 600;
        @media only screen and ( max-width: 430px){
        font-size: 15px;

      }

    }


    .footInfo{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c1c2c8;
        font-size: 10px;
        @media only screen and ( max-width: 430px){
            font-size: 12px;
      }

    }

`

const ModifyingInfo = () => {

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState("");
    const [userPwd, setUserPwd] = useState("");
    const [userPhone, setUserPhone] = useState("");

   const [inputConPw, setInputConPw] = useState("");

    // 오류 메세지
    const [conPwMessage, setConPwMessage] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    // 유효성 검사
    const [isPw, setIsPw] = useState(false)
    const [isConPw, setIsConPw] = useState(false);


      //저장된 주소와 아이디값을 설정하여 주소는 받아오고 아이디값은 저장한다.
    const context = useContext(UserContext);
    const {addr, setAddr} = context;

    const userId = window.localStorage.getItem("userIdSuv");
    const nav = useNavigate();

     //주소찾기 영역
     const [isPopupOpen, setIsPopupOpen] = useState(false);

     // 팝업창 열기
     const openPostCode = () => {
         setIsPopupOpen(true);
     }

     // 팝업창 닫기
     const closePostCode = (e) => {
         setIsPopupOpen(false);
     }

     // 비밀번호 정규식
     const onChangePw = (e) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/ // 비밀번호 정규식
        const passwordCurrent = e.target.value ;
        setUserPwd(passwordCurrent);
        if (!passwordRegex.test(passwordCurrent)) {
            setPwMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
            setIsPw(false)
        } else {
            setPwMessage("")
            setIsPw(true);
        }
    }

     //비밀번호 확인
     const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value ;
        setInputConPw(passwordCurrent)
        if (passwordCurrent !== userPwd) {
            setConPwMessage('비밀 번호가 일치하지 않습니다.') // 입력한 비밀번호가 일치해야 함
            setIsConPw(false)
        } else {
            setConPwMessage('비밀 번호가 일치 합니다.')
            setIsConPw(true);
        }
    }


    useEffect(()=> {
        const getUser = async() => {
            const rsp = await AxiosFinal.memberGet(userId);
            if(rsp.status === 200)
            setUser(rsp.data);
            setAddr(rsp.data.userAddr);
            console.log(rsp.data);
        };
        getUser();
    }, []);


    const onClickInfoSave = async() => {
        let modifiedUser = { ...user }; // 기존 유저 정보를 복사하여 수정할 정보를 반영할 객체를 생성

        // 이름이 변경되었을 때만 수정 정보에 반영
        if (userName) {
            modifiedUser = { ...modifiedUser, userName: userName };
        }

        // 비밀번호가 변경되었을 때만 수정 정보에 반영
        if (userPwd) {
            modifiedUser = { ...modifiedUser, userPwd: userPwd };
        }

        // 휴대전화 번호가 변경되었을 때만 수정 정보에 반영
        if (userPhone) {
            modifiedUser = { ...modifiedUser, userPhone: userPhone };
        }

         // 주소가 변경되었을 때만 수정 정보에 반영
        if (addr) {
            modifiedUser = { ...modifiedUser, userAddr: addr };
        }


        console.log("확인");
        const response = await AxiosFinal.saveUserInfo(userId, modifiedUser.userName, modifiedUser.userPwd, modifiedUser.userPhone, modifiedUser.userAddr);
        const result = response.data;
        console.log(result);
        if (result) {
            alert("수정이 완료되었습니다")
            nav("/Mypage");
        } else {
            alert("수정실패");
        }


    }


    const onChangeName = (e) => {
        setUserName(e.target.value)
    }

    const onChangePhone = (e) => {
        setUserPhone(e.target.value)
    }

    const onChangeAddr = (e) =>{
        setAddr(e.target.value)
    }

    const [imageURL,setImageURL] = useState();
    const onSelectProfileImg = (e) => {
        e.preventDefault();
        e.persist();
        //선택한 파일
        const image = e.target.files;
        if(!image) return null;
        const storageRef = ref(storage, `uploadimg/${image[0].name}`);
        const uploadTask = uploadBytes(storageRef, image[0]);
        uploadTask.then((snapshot) =>{
        getDownloadURL(snapshot.ref).then((downloadURL) =>{
            console.log("File avalable at",downloadURL);
            alert("이미지 업로드가 완료되었습니다.")
            setImageURL(downloadURL);

        })
        })
    };
    const onChangeProfileImg =async(userEmail)=>{
        console.log(userEmail,imageURL)
        const response = await AxiosFinal.changeUserImg(userEmail,imageURL);
        alert("이미지가 등록되었습니다.")
        nav("/Mypage");
    }
    return(
        <Container>
            <MainBody>
                <Logo>
                <a href="/"><div className="logo" >
                     iMMUTABLE
                    </div></a>
                </Logo>
                <Title>
                    <div className="ti">
                        회원 정보 수정
                    </div>
                </Title>

                <Info>
                    <div className="userInfo">
                        <img src={user.userImg} className="profileImg"/>
                        <input type="file" onChange={(e)=>{onSelectProfileImg(e)}} />
                        <button onClick={()=>onChangeProfileImg(user.userEmail)} className="profileChangBtn">이미지 수정</button>
                        <div className="line"></div>
                        <div className="content">
                        저희 쇼핑몰을 이용해 주셔서 감사합니다.
                        <br/>
                        {user.userName}님의 변경하실 정보를 입력해주세요.
                        </div>
                    </div>
                </Info>

                <InnerContainer >
                <div className="info">기본정보</div>
                    <div className="info2"><div style={{color:'red'}}>*</div>필수입력사항</div>
                    <Body>
                    <div className="input">
                        <div className="item">
                            <label >이메일</label>
                            <input type="Email" value={user.userEmail}/>
                        </div>
                        <div className="item">
                            <label >이름 <div style={{color:'red'}}>*</div></label>
                            <input type="text" placeholder="Name" defaultValue={user.userName}  onChange={onChangeName} />
                        </div>
                        <div className="item">
                            <label >비밀번호 <div style={{color:'red'}}>*</div></label>
                            <input type="password" defaultValue={user.userPwd} placeholder="PWD" onChange={onChangePw}/>

                        <div className="hint">
                                {userPwd.length > 0 && (
                                <span className={`message ${isPw ? 'success' : 'error'}`} style={{ color: isPw ? 'blue' : 'red' }}>{pwMessage}</span>)}
                        </div>
                        </div>
                        <div className="item">
                            <label >비밀번호확인 <div style={{color:'red'}}>*</div></label>
                            <input type="password" defaultValue={user.userPwd} placeholder="PWD CHECK" onChange={onChangeConPw}/>
                        <div className="hint">
                            {userPwd.length > 0 && (
                            <span className={`message ${isConPw ? 'success' : 'error'}`} style={{ color: isConPw ? 'blue' : 'red' }}>{conPwMessage}</span>)}
                        </div>
                        </div>
                        <div className="item">
                            <label >주소 </label>
                            <input type="text" placeholder="ADDRESS" className="addrInput" value={addr} onChange={onChangeAddr}/>
                            <button className="addrBtn" onClick={openPostCode}>주소찾기</button>
                            <div id='popupDom'>
                                {isPopupOpen && (
                                        <PopupPostCode onClose={closePostCode} />
                                )}
                            </div>
                        </div>
                        <div className="item">
                            <label>휴대전화 <div style={{color:'red'}}>*</div></label>
                            <input type="phone" placeholder="Phone" defaultValue={user.userPhone}  onChange={onChangePhone} />
                            </div>

                    </div>
                    </Body>
                    <div className="btn">
                     <button className="modify-btn" onClick={onClickInfoSave}>회원정보수정</button>
                        <Link to={"/Mypage"}> <button className="cancle-btn">취소</button></Link>
                    </div>
                </InnerContainer>


                <Footer>
                <div className="fotbox">
                    <div className="foot">
                        iMMUTABLE & Q / A
                    </div>
                    <div className="footInfo">
                        MON - FRI : AM 10:00 ~ PM 05:00 LUNCH TIME : PM 12:00 ~ PM 01:00 SAT.SUN.HOLIDAY CLOSED
                    </div>
                    <div className="footInfo">
                        카카오뱅크 : 3333-333-3333 예금주 : iMMUTABLE
                    </div>
                </div>
            </Footer>
            </MainBody>
        </Container>
    )
}



export default ModifyingInfo;