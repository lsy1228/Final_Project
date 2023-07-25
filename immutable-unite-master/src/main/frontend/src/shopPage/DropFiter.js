import React from "react"
import styled from "styled-components"


const Conatainer = styled.div`
    right: 0px;
    width: 200px;
    position: absolute;
    z-index: 100;
`
const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    .sel{
        color: black;
        padding: 10px 10px 10px 10px;
        font-size: 12px;

       
    }
    

    .list{
        margin-bottom: 8px;
        :hover{
            color: #ccc;
        }
    }
`




const DropFiter = () => {

    return(
        <Conatainer>
            <Select>
                <div className="sel">
                    <div className="list">최신순</div>
                    <div className="list">신상품순</div>
                    <div className="list">높은 가격순</div>
                    <div className="list">낮은 가격순</div>
                </div>
            </Select>
        </Conatainer>
    )
}


export default DropFiter