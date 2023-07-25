import React from "react";
import styled from "styled-components";
import Top from "./Top";
import Bottom from "./Bottom";
import Shop from "./Shop";
import { Link } from "react-router-dom";



const Container = styled.div`
    background-color: white;
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    z-index: 100;
`

const Head = styled.div`
    margin-right: 15%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    .top{
        font-size: 14px;
        margin: 5px;
        color: black;
    }

    .list{
        color: #ccc;
        font-size: 12px;
        padding: 5px;
        :hover{
            color: black;
        }
    }

`




const DropdownMenu = () => {

    return(
        <Container> 
            <Head>
               <Link to="/Shop"><div className="top">SHOP</div></Link>
                <div className="list">NEW RELEASRS</div>
                <Link to="/Top"><div className="list">TOPS</div></Link>
                <div className="list">OUTERWEAR</div>
                <Link to="/Bottom"><div className="list">BOTTOMS</div></Link>
                <div className="list">FOOTWEAR</div>
                <div className="list">ACCESSORIES</div>
            </Head>
            <Head>
                <div className="top">COLLECTION</div>
                <div className="list">LOOKS</div>
                <div className="top" style={{marginTop: '20px'}}>THE ETERNAL COLLECTION</div>
                <div className="list">SHOP ETERNAL</div>
                <div className="list">OVERVIEW</div>
                <div className="list">FILM</div>
                <div className="list">SECOND DELIVERY</div>
            </Head>
            
        </Container>
        
    )
}

export default DropdownMenu