import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import AxiosFinal from "../api/AxiosFinal";
import MyPageHeader from "../shopPage/MypageHeader";
import { UserContext } from "../context/UserInfo";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Body = styled.div`
     width: 100%;
      @media only screen and ( max-width: 430px){
        width: 380px;
      }
    
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
       
    }
    a {
        text-decoration: none;
        color: black;
    }
    p {
        font-size: 12px;
        color: gray;
    }

    button {
        border-style: none;
        background-color: rgba(0, 0, 0, 0);
    }
    .deleteBtn {
        float: right;
        &:hover{
            color: red;
        }
    }
     
`

const InnerContainer = styled.div`
    margin: 50px 0 50px 0;
    width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;



const Button = styled.button`
    margin: 60px 0 20px 0;
    float: right;
    background-color: rgba(0, 0, 0, 0);
    border: none;
        a {
            color : black;
            text-decoration: none;
            &:hover{
                color: gray;
            }
        }
    
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    
    .fotbox{
        height: 100px;
    }

    .tt1{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #8b9192;
        font-size: 14px;
        font-weight: 600;
    }


    .tt2{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c1c2c8;
        font-size: 12px;
    }

`

const FAQ = () => {

    const navigate = useNavigate();
    const [faqList, setFaqList] = useState(""); // faq 전체를 불러와서 제목과 내용만 추출
    const context = useContext(UserContext);
    const {userEmail, setUserEmail} = context;

    const onClickAddFaq = () => {
        navigate(`/Board/0`); // 수정하는 버튼이랑 차별을 주기 위해 0 넣음
    }

    // faq 삭제
    const onClickDelete = async(props) => {
        console.log("click");
        const response = await AxiosFinal.faqDelete(props);
        if(response.data) {
            console.log("삭제되었습니다.");
            setFaqList(faqList.filter((faq) => faq.faqId !== props)); // faq 삭제한 뒤 새로 고침 없이 새로운 faqList 반영
        } else {
            console.log("삭제에 실패하였습니다.");
        }
    }

    // faq 수정
    const onClickEdit = (faqId) => {
        navigate(`/Board/${faqId}`);
    }

    // faq List 불러오기
    useEffect(() => {
        const getList = async() => {
           const response = await AxiosFinal.faqList();
           setFaqList(response.data);
           console.log(response.data);
        };
        getList();
   }, []);

    const [admin, setAdmin] = useState(false);

    const adminAccount = window.localStorage.getItem("userIdSuv");
    console.log(adminAccount);

    // admin 확인
    useEffect(() => {
        const isAdmin = async() => {
            const response = await AxiosFinal.faqIsAdmin(adminAccount);
            console.log("안녕낭" + response.data);
            if (response.data === true) {
                console.log("어드민 로그인이면 이쪽으로 와^^")
                setAdmin(true);
            }
        };
        isAdmin();
    },[]);

    return (
        <Container>
         <MyPageHeader />
            <InnerContainer>  
                <Body>
                <h1>FAQ</h1>
                    <div className="FAQ">
                        <Accordion>
                            {/* map으로 faqList를 가져와서 title 과 content만 추출해옴 */}
                            {faqList && faqList.map(faq => (
                                <AccordionItem key={faq.faqId} header={`Q. ${faq.faqTitle}`}> 
                                    <hr />
                                    <p>A.{faq.faqContent}</p>
                                    {admin && <button className="deleteBtn" onClick={() => onClickEdit(faq.faqId)}>수정</button>}
                                    {admin && <button className="deleteBtn" onClick={() => onClickDelete(faq.faqId)}> 삭제</button>}
                                </AccordionItem>
                             ))}
                        </Accordion>
                    </div>
                    <Button>
                        {admin && <button className="faq-button" onClick={onClickAddFaq}>FAQ 추가</button>}
                    </Button>
                    </Body>
                </InnerContainer>
                <Footer>
                <div className="fotbox">
              <div className="tt1">
              iMMUTABLE & Q / A
              </div>
              <div className="tt2">
              MON - FRI : AM 10:00 ~ PM 05:00 LUNCH TIME : PM 12:00 ~ PM 01:00 SAT.SUN.HOLIDAY CLOSED
                </div>
                <div className="tt2">
                카카오뱅크 : 3333-333-3333 예금주 : iMMUTABLE
                </div>
                </div>
            </Footer>
            </Container>
        );
};

export default FAQ;