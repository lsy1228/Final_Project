import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Link , useNavigate} from 'react-router-dom';
import AxiosFinal from "../api/AxiosFinal";
import MyPageHeader from "../shopPage/MypageHeader";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    
`;

const InnerContainer = styled.div`
    width: 100%;
    margin-top: 50px;
    .header {
        margin: 0 40px;
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .wrapper {
        margin: 0 60px;
        display: flex;
        flex-wrap: wrap;
        .product {
            margin: 15px 15px;
            img {
                height: 400px;
            }
            .wrapProduct {
                display: flex;
                justify-content: space-between;
                .name {
                    font-weight: bold;
                }
                button {
                    background-color: white;
                    font-size: 15px;
                    border: none;
                    cursor: pointer;
                }
            }
        }
    }
    @media (max-width: 390px) {
            .wrapper {
                margin: 0 30px;
            }
        }
`;


const Wishlist = () => {
    const [product, setProduct] = useState([]);
    const [wish, setWish] = useState(false);
    const navigate = useNavigate();

    const id = window.localStorage.getItem("userIdSuv");
    console.log(id);
    useEffect(()=> {
        const wishItem = async() => {
            if(!id) {
                return;
            }
            const rsp = await AxiosFinal.wishItem(id);
            if(rsp.status === 200) setProduct(rsp.data);
            console.log(rsp.data);
        };
        wishItem();
    }, [wish]);

    const deleteWish = async(id, productId) => {
        const productLikeDelete = await AxiosFinal.deleteLikeProduct(id, productId);
        setWish(!wish);
    }


    return (
        <Container>
            <MyPageHeader />
            <InnerContainer>
                <div className="header">나의 위시리스트
                <hr />
                </div>
                <div className="wrapper">
                    {product && product.map((e)=> (
                    <div className="product" key={e.productId}>
                        <img src={e.productImgFst} alt="" />
                        <div className="wrapProduct">
                            <div className="productInfo">
                                <div className="name">{e.productName}</div>
                                <div className="price">{e.productPrice.toLocaleString()}</div>
                            </div>
                            <button onClick={()=>deleteWish(id, e.productId)}>X</button>
                            </div>
                        </div>
                       ))}
                </div>
            </InnerContainer>
        </Container>
    );
}



export default Wishlist;