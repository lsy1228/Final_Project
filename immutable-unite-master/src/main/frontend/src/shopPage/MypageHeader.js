import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import AxiosFinal from "../api/AxiosFinal";
import { UserContext } from "../context/UserInfo";


const Container = styled.div`
    width: 100%;
    display: flex;
    @media only screen and ( max-width: 430px){
        width: 390px;
    }

`

const Mainbody=styled.div`
    width: 100%;
    margin: 0px 40px 0px 40px;
    @media only screen and ( max-width: 430px){
        margin: 0;
    }

    `

const TopButton = styled.button`
    border: none;
    background-color: white;
    &:hover{
        color: rgba(0,0,0,0.5);
    }
`

const Head = styled.div`
    width: 100%;
    height: 70px;
    display: flex;

    @media only screen and ( max-width: 430px){
        align-items: center;

}

    a{
        text-decoration: none;
        color: black;
    }

    .nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        @media only screen and ( max-width: 430px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .nav2{
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        font-size: 50px;
        @media only screen and ( max-width: 430px){
        margin-left: 5%;
        font-size: 40px;
        width: 180px;
      }
    }

    .nav3{

        display: flex;
        width: 300px;
        justify-content: flex-end;
        font-size: 13px;
        margin-top: auto;
        div{
            margin-left: 20px;
        }
        @media only screen and ( max-width: 430px){
            width: 390px;
            height: 30px;
      }
    }
`

//카트 영역
const CartToggle=styled.div`
    margin-top: 30px;
    width: 260px;
    display: flex;
    flex-direction: column;
    border: 1px solid #CCC;
    background-color: white;
    position: absolute;
    right: 2.8rem;
    top:3rem;
     z-index: 100;

    a{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    text-decoration: none;
    background-color: black;
    color: white;
    &:hover{
        background-color: #CCC;
        color: black;
    }
  }


  .cartToggleItem{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid #CCC;
    display: flex;
    img{
        height: 100px;
    }
  }
  .itemInfo{
    width: 200px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center
  }
  .itemName{
    height: 20px;
    font-weight: bolder;

  }
  .deleteItem{
    border: none;
    background-color: white;
    cursor: pointer;
    color: #CCC;
    &:hover{
        color: black;
    }
  }
  .count{
    display: flex;
  }
  .plus,.minus{
    height: 13px;
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    cursor: pointer;
    &:hover{
        color: white;
        background-color: black;
    }
  }
  .countbutton{
    display: flex;
    flex-direction: column;
  }
  input{
    width: 20px;
    height: 20px;
  }
  .itemPrice{
  }

`

  const CartList=styled.div`
    border-bottom: 1px solid #ccc;
    width: 100%;
    height: 100px;
    // overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;
    }
  `



const IsLoginFalse = [
    { name : "login"}
  ]
  const IsLoginTrue = [
    { name : "logout"},
    { name : "mypage"},
    { name : "cart"},
    { name : "FAQ"}
  ]

const MyPageHeader = () => {
    const [count, setCount] = useState([]);
    const[cartList, setCartList] = useState([]);
    const {isLogin, setIsLogin} = useContext(UserContext);


     //카트 토글 여는 컴포넌트
     const [openCart, setOpenCart] = useState(false);

    const isUserLogin = window.localStorage.getItem("isLoginSuv");
     const id = window.localStorage.getItem("userIdSuv");

    const navigate = useNavigate();
    const onChangePage=(e)=>{
        console.log(e);
        if(e==="cart"){
            //카트 창 열리기
            setOpenCart(!openCart);
        }
        else if (e==="FAQ") {
            navigate("/FAQ")
        }
        else if(e==="logout"){
            window.localStorage.setItem("isLoginSuv", "FALSE");
            window.localStorage.setItem("userIdSuv", "");
            setIsLogin(false);
            navigate("/");
        }
        else if(e==="SHOP"){
            navigate("/Shop");
            console.log(e);
        }
        else if(e==="mypage"){
            navigate("/Mypage")
        }
    }








    useEffect(() => {
        const getCartList = async()=>{
            if(!id) {
                return;
            }
            const rsp = await AxiosFinal.cartItemList(id);
            if(rsp.status === 200) {
                const copyCnt = rsp.data.map(e => e.count);
                setCartList(rsp.data);
                console.log(rsp.data);
                setCount(copyCnt);
            }
        };
        getCartList();
    }, []);

    const updateCount = async (count, cartList, idx) => {
        const response = await AxiosFinal.updateCount( count, cartList, idx);
        const result = response.data;
        console.log(result)
    };
    console.log(cartList)



    // 수량 증가
    const countPlus = (idx) => {
        console.log(idx);
        setCount(prevCount => {
            const newCount = [...prevCount];
            newCount[idx] += 1;
            updateCount(newCount[idx], cartList, idx);
            return newCount;
        });
    };


    // 수량 감소
    const countMinus = (idx) => {
        setCount(prevCount => {
            const newCount = [...prevCount];
            if (newCount[idx] > 1) {
                newCount[idx] -= 1;
                updateCount(newCount[idx], cartList, idx);
            }
            return newCount;
        });
    };



    // 카트 아이템 삭제
    const deleteCartItem = async(id, index) => {
        console.log(index);
        console.log("삭제");
        const cartItemId =  cartList[index].cartItemId;
console.log(" ::"  + cartItemId);
        const rsp = await AxiosFinal.deleteCartItem(id, cartItemId);
        setCartList(rsp.data);
    }





    return(
      <Container>
            {openCart &&
                          <CartToggle >
                             {cartList && cartList.map((e, index)=>(
                                  <CartList  key={e.cartItemId}>
                                      <div className="cartToggleItem">
                                          <div className="itemImg">
                                              <img src={e.productImgFst} />
                                          </div>
                                          <div className="itemInfo">
                                              <div className="itemName">
                                              {e.productName}
                                              </div>
                                              <div  className="count">
                                                  <input type="text" Value={count[index]}/>
                                                  <div className="countbutton">
                                                  <button className="plus" onClick={()=>countPlus(index)}>∧</button>
                                                          <button className="minus" onClick={()=>countMinus(index)}>∨</button>
                                                  </div>
                                              </div>
                                              <div className="itemPrice">
                                              {(e.setOriginProductPrice * count[index]).toLocaleString()} won
                                              </div>
                                          </div>
                                          <button className="deleteItem"  onClick={() => deleteCartItem(id, index)}>x</button>
                                      </div>
                                   </CartList>
                             ))}
                                      <Link to="/Cart">장바구니</Link>
                              </CartToggle>
                                }
        <Mainbody>
            <Head>
                <div className="nav">
                    <a href="/"><div className="nav2" >
                     iMMUTABLE
                    </div></a>
                    <div className="nav3">
                    {isUserLogin==="FALSE" && IsLoginFalse.map(s=> (
                                        <TopButton key={s.name}>
                                            <Link to="/Login">{s.name}</Link>
                                        </TopButton>
                                    ))}
                          {isUserLogin==="TRUE" && IsLoginTrue.map(s=> (
                                        <TopButton key={s.name} onClick={()=>onChangePage(s.name)}>
                                            {s.name}
                                        </TopButton>
                                    ))}
                            
                    </div>
                </div>
            </Head>
        
            </Mainbody>
       
       </Container>  
       
     )
 };
 
 
 export default MyPageHeader;        