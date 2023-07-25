import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import MyPageHeader from "../shopPage/MypageHeader";



const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    @media only screen and ( max-width: 390px){
            width: 390px;
          }
`



const MainBody = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

     @media only screen and ( max-width: 390px){
            width: 390px;
     }

`



const InnerContainer = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`


const Body = styled.div`
    display: flex;
    width: 1010px;
    flex-wrap: wrap;

     @media only screen and ( max-width: 390px){
            width: 390px;
     }

    a{
        text-decoration: none;
        color: black;
    }

    .box{
        cursor: pointer;
        display: flex;
        width: 500px;
        height: 160px;
        border: 1px solid #ccc;
        align-items: center;
        justify-content: center;
        flex-direction: column;


        .title{
            margin-bottom: 10px;
            width: 100%;
            display: flex;
            font-size: 15px;
            font-weight: bolder;
            align-items: center;
            justify-content: center;
        }

        .tt1{
            color: #656165;
            font-size: 11px;
            margin-left: 20px;
        }

        .tt2{
            display: flex;
            align-items: center;
            justify-content: center;
            color: #a19aa2;
            font-size: 10px;
        }
    }

    @media only screen and (max-width: 1000px) {
        .box{
            height: 100px;
        }
    }

`

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



const Mypage = () =>{
    const nav = useNavigate();

       const isLogin = window.localStorage.getItem("isLoginSuv");
       const id = window.localStorage.getItem("userIdSuv");
       console.log(id);

       const clickOrder = () => {
           nav("/Order");
       }

    return(
        <Container>
            <MainBody>
             <MyPageHeader />
            <InnerContainer>   
                <Body>
                    <div className="box" onClick={clickOrder}>
                       <div className="title">ORDER <div className="tt1"> 주문내역조회</div></div>
                       <div className="tt2">
                        고객님께서 주문하신 상품의 주문내역을 확인할 수 있습니다. 
                       </div>
                    </div>
                    <div className="box">
                    <Link to="/ModifyingInfo">
                        <div className="title">PROFILE <div className="tt1"> 회원 정보</div></div>
                       <div className="tt2">
                        회원이신 고객님의 개인정보 및 수정하는 공간입니다.
                       </div> 
                       <div className="tt2">
                       개인정보를 최신 정보로 유지하시면 보다 간편히 쇼핑을 즐길실 수 있습니다.
                       </div>
                       </Link>
                    </div>
                    
                    <div className="box">
                        <Link to="/Wishlist">
                            <div className="title"> WISHLSIT <div className="tt1"> 관심 상품</div></div>
                            <div className="tt2">
                            관심상품으로 등록하신 상품의 목록을 보여드립니다.
                            </div>
                       </Link>
                    </div>

                    <div className="box">
                        <Link to="/Mypost">
                        <div className="title">BOARD<div className="tt1"> 게시물 관리</div></div>
                        <div className="tt2">
                            고객님께서 작성하신 게시물을 관리하는 공간입니다. 
                        </div>
                        <div className="tt2">
                            고객님께서 작성하신 글을 한눈에 관리하실 수 있습니다.
                        </div>
                        </Link>
                    </div>
                    <div className="box">
                        <Link to="/FAQ">
                            <div className="title">NOTICE <div className="tt1"> 공지사항</div></div>
                            <div className="tt2">
                                    공지사항 및 자주 묻는 질문을 보실 수 있는 공간입니다.
                            </div>
                            <div className="tt2">
                                    궁금하신 내용을 한눈에 보실 수 있습니다.
                            </div>
                        </Link>
                    </div>
                    <div className="box">
                        <Link to="/Secession">
                            <div className="title">SECESSION<div className="tt1"> 회원탈퇴</div></div>
                            <div className="tt2">
                                더 이상 이용을 원치 않을 경우 회원 탈퇴를 하실 수 있습니다.
                            </div>   
                       </Link>
                    </div>
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
            </MainBody>
        </Container>
    )
}


export default Mypage;