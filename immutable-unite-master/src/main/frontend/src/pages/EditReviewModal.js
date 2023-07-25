import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AxiosFinal from "../api/AxiosFinal";
import { FaStar } from 'react-icons/fa';
import { storage } from "../adminPage/FireBase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const Container = styled.div`
    .backdrop {
        position: fixed;
        top: 0;
        left : 0;
        width: 100%;
        height: 100vh;
        z-index: 98;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .modal {
        display: none;  // 숨겨진 상태로 시작
        position: fixed;
        width: 650px;
        height: 510px;
        top: 10%;  // 화면 전체를 덮도록 위치
        bottom: 0;
        left: 25%;
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
            margin: 10px 10px;
            .rate {
                font-size: 20px;
                padding-left: 35px;
            }
            .innerContainer {
                display: flex;
                justify-content: space-evenly;
                .product {
                    margin: 20px 0 50px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 220px;
                        height: 220px;
                        object-fit: cover;
                    }
                    .btns {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 10px;
                        .input-file-button{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 45%;
                            border: 1px solid black;
                            cursor: pointer;
                            font-size: 13px;
                        }
                        .deleteImg {
                            width: 45%;
                            padding: 4px 10px;
                            background-color: white;
                            border: 1px solid black;
                            font-size: 13px;
                            margin: 0;
                            cursor: pointer;
                        }
                    }
                    .noImgInput {
                        .noImg {
                            width: 220px;
                            height: 220px;
                            margin-bottom: 10px;
                            background-color: #E6E6E6;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: black;
                        }
                        .input-file{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 99%;
                            height: 30px;
                            border: 1px solid black;
                            cursor: pointer;
                            font-size: 14px;
                        }
                    }
                }
            .inputBox {
                padding-top: 20px;
            }
            .mainTitle {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 10px;
                .title {
                    padding-right: 10px;
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
                height: 210px;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 20px;
                .content {
                    padding-right: 10px;
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
        }
            .Btn {
                display: flex;
                justify-content: center;
                button {
                    width: 100px;
                    height: 30px;
                    cursor: pointer;
                    margin-right: 20px;
                    border: 1px solid black;
                }
                .write {
                    background-color: black;
                    color: white;

                }
            }
        }
    }

    @media (max-width: 430px) {
            .modal {
                position: fixed;
                width: 90%;
                height: 77%;
                left: 20px;
            }
            .form {
                .main {
                    .rate {
                        padding-left: 25px;
                    }
                   .innerContainer {
                        display: flex;
                        flex-direction: column;
                        .product {
                            margin: 10px 0px 10px 0px;
                            .reviewImgContainer {
                                img {
                                    width: 310px;
                                    height: 150px;
                                    object-fit: contain;
                                }
                            }
                            .noImgInput {
                                .noImg {
                                    width: 310px;
                                    height: 150px;
                                }
                            }
                        }
                        .inputBox {
                            .mainCon {
                                height: 110px;
                            }
                        }
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

const EditReviewModal = (props) => {
    const {open, close, reviewId} = props;
    const [inputTitle, setInputTitle] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [reviewInfo, setReviewInfo] = useState('');
    const [userRate, setUserRate] = useState('');
    const [imgUrl, setImgUrl] = useState('');

    useEffect(()=> {
       const getMyReview = async() => {
        const response = await AxiosFinal.editMyReviewInfo(reviewId);
        setReviewInfo(response.data);
        setInputTitle(response.data.reviewTitle);
        setInputContent(response.data.reviewContent);
        setUserRate(response.data.reviewRate);
        setImgUrl(response.data.reviewImg);
       }
       getMyReview(reviewId);

    }, [reviewId]);


    const editTitle = (e) => {
        setInputTitle(e.target.value);
    }

    const editContent = (e) => {
        setInputContent(e.target.value);
    }

    const editMyReview = async() => {
       const response = await AxiosFinal.editMyReview(reviewId, inputTitle, inputContent, userRate, imgUrl);
       if(response.data) {
            alert("리뷰 수정이 완료되었습니다.");
            close();
       } else {
            alert("리뷰 수정이 실패하였습니다.");
            close();
       }
    }

    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FaStar
                    icon={FaStar}
                    key={i}
                    style={{ color: i < (userRate || rating) ? 'black' : 'lightgray' }}
                    onClick={() => setUserRate(i + 1)}
                />
            );
        }
        return <div>{stars}</div>
    };

    const deleteImg = () => {
        setImgUrl('');
    }

    const selectReviewImg = (e) => {
        e.preventDefault();
        e.persist();
        const image = e.target.files;
        if (!image) return null;
        const storageRef = ref(storage, `uploadimg/${image[0].name}`);
        const uploadTask = uploadBytes(storageRef, image[0]);
        uploadTask.then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                console.log("file available at", downloadURL);
                alert("이미지 업로드가 완료되었습니다");
                setImgUrl(downloadURL);
            })
        })
    };

    return (
        <Container>
            {open && <div className="backdrop" />}
            <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
               <div className="form">
                    <header>
                        <div className="header-title">iMMUTABLE</div>
                        <div className="close" onClick={close}>&times;</div>
                    </header>
                    <div className="main">
                        <h2>리뷰수정</h2>
                        <div className="rate">
                           <StarRating rating={reviewInfo.reviewRate} />
                        </div>
                        <div className="innerContainer">
                            <div className="product">
                                {imgUrl ? (
                                    <div className="reviewImgContainer">
                                        <img src={imgUrl} alt="" />
                                        <div className="btns">
                                            <button className="deleteImg" onClick={deleteImg}>이미지 삭제</button>
                                            <label className="input-file-button" htmlFor="input-file">
                                                이미지 업로드
                                            <input type="file" id="input-file" style={{ display: "none" }} onChange={(e)=>selectReviewImg(e)} />
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="noImgInput">
                                        <div className="noImg">업로드한 이미지가 없습니다.</div>
                                        <label className="input-file" htmlFor="input-file">이미지 업로드</label>
                                        <input type="file" id="input-file" style={{ display: "none" }} onChange={selectReviewImg} />
                                    </div>
                                )}
                            </div>

                            <div className="inputBox">
                                <div className="mainTitle">
                                    <div className="title">제목</div> <input type="text" defaultValue={inputTitle} onChange={editTitle} />
                                </div>
                                <div className="mainCon">
                                    <div className="content">내용</div> <textarea defaultValue={inputContent} onChange={editContent} />
                                </div>
                            </div>
                        </div>
                        <div className="Btn">
                            <button className="cancle" onClick={close}>취소</button>
                            <button type="submit" className="write" onClick={()=>editMyReview(reviewId, inputTitle, inputContent, userRate, imgUrl)}>수정하기</button>
                        </div>
                    </div>
                </div>
            }
            </div>
        </Container>
    );
};
export default EditReviewModal;