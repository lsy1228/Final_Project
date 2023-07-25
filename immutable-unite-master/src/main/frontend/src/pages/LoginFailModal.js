import React  from "react";
import styled from "styled-components";

const Container = styled.div`
    .normalBackground{

    }
    .blockBackground{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    }
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        width: 280px;
        height: 70px;
        top: 45%;  // 화면 전체를 덮도록 위치
        bottom: 0;
        left: 40%;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: white;
        border-radius: 10px;
 }

    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        width: 100px;
        height: 30px;
        outline: none;
        cursor: pointer;
        margin-right: 20px;
        border: 0;
    }

    .form {
        border: 1px solid black;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        //팝업이 열릴때 스르륵 열리는 효과
        animation: modal-show 0.3s;
        overflow: hidden;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 30px;
            background-color: #E6E6E6;
            .header-title {
                margin-left: 5px;
                font-weight: bold;
            }
            .close {
                margin-right: 5px;
                cursor: pointer;
            }
        }
        .main {
           display: flex;
           /* border: 1px solid black; */
            .closeButton{
                border: 1px solid black;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    background-color: black;
                    color: white;
                }
            }
            margin: 10px 10px;
            .product {
                margin: 40px 0;
                display: flex;
                justify-content: space-evenly;
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
                .productInfo {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .productName {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                }
            }
            .mainTitle {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 10px;
                .title {
                    width: 30px;
                    font-size: 14px;
                }
                input {
                    width: 250px;
                    outline: none;
                    border: 1px solid gray;
                }
            }
            .mainCon {
                width: 100%;
                height: 230px;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 20px;
                .content {
                    width: 30px;
                    font-size: 14px;
                }
                textarea {
                    width: 250px;
                    outline: none;
                    border: 1px solid gray;
                    resize: none;
                }
                textarea::placeholder {
                font-family: Arial, sans-serif;
                font-size: 14px;
                color: #999;
                }
            }
            .Btn {
                display: flex;
                justify-content: center;
                .write {
                    background-color: black;
                    color: white;
                    
                }
            }
        }
    }
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

const LoginFailModal = (props) => {
    const {open, close} = props;


    return (
        <Container>
            <div className={open? 'blockBackground' : 'normalBackground'}>
            <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
               <div className="form">
                    <header>
                        <div className="header-title">iMMUTABLE login Fail</div>                         
                        <div className="close" onClick={close}>&times;</div>
                    </header>
                    <div className="main">
                        id 혹은 password 를 다시 확인해주세요. &nbsp;<div className="closeButton" onClick={close}>닫기</div>
                    </div>
                    </div>
             
            }   
            </div>
            </div>
        </Container>
    );
};
export default LoginFailModal;