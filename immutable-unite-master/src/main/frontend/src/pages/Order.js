import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Link , useNavigate} from 'react-router-dom';
import MyPageHeader from "../shopPage/MypageHeader";
import AxiosFinal from "../api/AxiosFinal";
import { UserContext } from "../context/UserInfo";
import Pagenation from "./Pagenation";

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;


const InnerContainer = styled.div`
    width: 100%;
    height: 80%;
    margin-top: 30px;
    .headerWrapper {
        margin: 0 40px;
        .header {
            font-size: 25px;
            font-weight: bold;
            margin-bottom: 15px;
        }
    }

    @media (max-width: 430px) {
        width: 100%;
        height: 100%;
        .headerWrapper {
            margin: 0;
            .header {
                padding-left: 15px;
            }
        }
    }
`;

const OrderTable = styled.div`
    width: 100%;
    height: fit-content;
    .wrapper {
        margin: 0 40px;
        .orderTable {
            width: 100%;
            th {
                padding-bottom: 10px;
            }
            td {
                text-align: center;
                a {
                    text-decoration: none;
                    color: black;
                    &:hover {
                        color: gray;
                    }
                }
            }
            .Info {
                width: 40%;
            }
            .Date, .Price {
                width: 15%;
            }
            .Num, .Status, .Review {
                width: 10%;
            }
            .tdInfo {
                display: flex;
                justify-content: space-evenly;
                img {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                }
                .name {
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                }
                .size {
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                }
            }
            .reviewWrite {
                border: 1px solid black;
                width: 100px;
                height: 30px;
                background-color: black;
                color: white;
                cursor: pointer;
            }
            .reviewBtn {
                border: 1px solid black;
                width: 100px;
                height: 30px;
                background-color: white;
                color: black;
            }
            .noOrder {
                height: 100px;
                cursor: default;
            }
        }
    @media (max-width: 430px) {
        margin: 0;
        .orderTable{
            .Info {
                width: 10%;
            }
            .Date, .Price, .Review{
                width: 20%;
            }
            .Num, .tdNum {
                display: none;
            }
            .tdInfo {
                display: block;
            }
            th, td {
                font-size: 13px;
                white-space: nowrap;
            }
            .reviewBtn {
                border: 1px solid black;
                width: 60px;
                font-size: 11px;
            }
            .reviewWrite {
                border: 1px solid black;
                width: 60px;
                font-size: 11px;
            }
        }
    }
}
`;



const Order = () => {
    const navigate = useNavigate();

    const {orderId, setOrderId} = useContext(UserContext);

    const onClick = (productId, orderId) => {
        setOrderId(orderId);
        navigate(`/Review/${productId}`);
    }

    const id = window.localStorage.getItem("userIdSuv");
    const [orderList, setOrderList] = useState([]);

    // pagenation
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(()=> {
        const orderView = async() => {
            const rsp = await AxiosFinal.orderHistory(id);
            console.log(rsp.data); setOrderList(rsp.data);
        }
        orderView();
    }, []);

    const orderStatusMap = {
        CHECK : "주문확인",
        READY : "상품준비중",
        SHIP : "배송중",
        DONE : "배송완료"
    }

    const setOrderStatus = (orderStatus) => {
        return orderStatusMap[orderStatus] || '';
    }

    const sortedOrderList = orderList.slice().reverse();

    return (
        <Container>
            <MyPageHeader />
            <InnerContainer>
                <div className="headerWrapper">
                    <div className="header">주문내역 조회</div>
                    <hr />
                </div>
                <OrderTable>
                    <div className="wrapper">
                        <table className="orderTable">
                            <thead>
                                <tr>
                                <th className="Info">상품정보</th>
                                <th className="Num">주문번호</th>
                                <th className="Price">주문금액</th>
                                <th className="Status">주문상태</th>
                                <th className="Date">주문일자</th>
                                <th className="Review">리뷰작성</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedOrderList.length > 0 ? (sortedOrderList.slice(offset, offset+limit).map((e) => (
                                <tr key={e.orderId}>
                                    <td className="tdInfo">
                                        <div className="product"><img src={e.productImgFst} alt="" /></div>
                                        <div className="name">{e.productName}</div>
                                        <div className="size"><div>{e.productSize}</div></div>
                                    </td>
                                    <td className="tdNum">{e.orderId}</td>
                                    <td className="tdPrice">{e.productPrice.toLocaleString()}원</td>
                                        <td className="tdStatus">
                                            {e.orderStatus === 'SHIP' ? (
                                                <>
                                                {e.shipCompany === "CJ" && <a href={'https://trace.cjlogistics.com/web/detail.jsp?slipno='+ e.shipCode} target="blank">배송조회</a>}
                                                {e.shipCompany === "LOTTE" && <a href={'https://www.lotteglogis.com/home/reservation/tracking/linkView?InvNo='+ e.shipCode} target="blank">배송조회</a>}
                                                {e.shipCompany === "HANJIN" && <a href={'https://smile.hanjin.co.kr:9080/eksys/smartinfo/m.html?wbl='+ e.shipCode} target="blank">배송조회회</a>}
                                                </>
                                                ) : (
                                            setOrderStatus(e.orderStatus)
                                        )}
                                        </td>
                                    <td className="tdDate">{e.orderDate}</td>
                                    {e.orderStatus === 'DONE' ? (
                                        e.reviewed ? (
                                        <td className="tdReview"><button className="reviewBtn">작성완료</button></td>)
                                        : (
                                        <td className="tdReview"><button className="reviewWrite" onClick={() => onClick(e.productId, e.orderId)}>리뷰작성</button></td>
                                        )
                                    ) : (
                                        <td className="tdReview"></td>
                                    )}
                                    </tr>
                                ))) :
                                (
                                    <tr>
                                        <td colSpan={6} className="noOrder"> 주문 내역이 없습니다. </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </OrderTable>
            </InnerContainer>
            <Pagenation
                    total={orderList.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
        </Container>
    );
}

export default Order;