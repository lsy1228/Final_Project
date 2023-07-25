import React from "react";
import styled from "styled-components";

const Container = styled.div`
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        top: 0;  // 화면 전체를 덮도록 위치
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99; // 다른 모달 보다 위에 위치하도록 함
        background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
    }

    .openModal {
        display: flex; // 모달이 보이도록 함
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }

    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
    }
    header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 30px;
            font-size: 11px;
            background-color: #E6E6E6;
            margin-left: 5px;
            font-weight: bold;
    }
    section {
        width: 250px;
        max-width: 450px;
        margin: 0 auto;
        border-radius: 0.3rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }

    section > header button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #999;
        background-color: transparent;
    }

    section > main {
        font-size: 12px;
        padding: 16px;
        border-bottom: 1px solid #dee2e6;
        border-top: 1px solid #dee2e6;
    }

    section > main > button {
        font-size: 12px;
        &:hover{
            background-color: black;
            color: white;
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

const ModalEmail = (props) => {
    const { open, close, type, header, children } = props;

    console.log("Modal Component : " + type);

    return (
        <Container>
            <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
                <section>
                    <header>
                        iMMUTABLE
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{children}&nbsp; <button onClick={close}>닫기</button></main>
               
                </section>
            }   
            </div>
        </Container>
    );
}

export default ModalEmail;