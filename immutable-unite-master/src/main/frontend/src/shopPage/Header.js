import React, {useState, useContext, useEffect} from "react";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";
import { useNavigate, Link } from "react-router-dom";


const Container = styled.div`
    width: 100%;
    display: flex;
    @media only screen and ( max-width: 430px){
        width: 380px;
    }
`

const Mainbody=styled.div`
    width: 100%;
    margin: 0px 40px 0px 40px;
    @media only screen and ( max-width: 430px){
        margin: 0;
        width: 380px;
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
    flex-direction: column;
    @media only screen and ( max-width: 430px){
         flex-direction: column;

    }

    a{
        text-decoration: none;
        color: black;
    }



    .nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    .nav1{
        align-items: center;
        justify-content: center;
        display: flex;
        font-size: 13px;
        cursor: pointer;
        margin-top: auto;
        &:hover{
            color: rgba(0,0,0,0.5);
        }

    }

    .nav2{
        margin-left: 40%;
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bolder;
        font-size: 50px;
        @media only screen and ( max-width: 430px){
        font-size: 30px;
        width: 160px;
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
            margin-top: 10%;

    }
    }

`





const MenuList = [
    {name : "iMMUTABLE"},
]

const IsLoginFalse = [
    { name : "login"}
  ]
  const IsLoginTrue = [
    { name : "logout"},
    { name : "mypage"},
    { name : "cart"},
    { name : "FAQ"}
  ]




const Header = ({ onClick }) => {
    const [selectedMenu, setSelectedMenu] = useState(null)

    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const {isLogin, setIsLogin} = useContext(UserContext);


    const isLogin = window.localStorage.getItem("isLoginSuv");
     const id = window.localStorage.getItem("userIdSuv");

    const navigate = useNavigate();
    const onChangePage=(e)=>{
        console.log(e);
        if(e==="cart"){
            navigate("/cart")
        }
        else if (e==="FAQ") {
            navigate("/FAQ")
        }
        else if(e==="logout"){
            window.localStorage.setItem("isLoginSuv", "FALSE");
            window.localStorage.setItem("userIdSuv", "");
            window.location.reload();
        }
        else if(e==="SHOP"){
            navigate("/Shop");
            console.log(e);
        }
        else if(e==="mypage"){
            navigate("/Mypage")
        }
    }


    const handleMenuClick = (menuName) => {

        if (selectedMenu === menuName) {
          setSelectedMenu(null) // 이미 선택된 메뉴를 다시 클릭하면 닫힙니다.
          setIsMenuClicked(true)
        } else {
          setSelectedMenu(menuName);
          setIsMenuClicked(false)
        }
      };



      const handleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
      };



    return(
      <Container>
        <Mainbody>
       
            <Head>
                <div className="nav">
                    <div className="nav1"   onClick={onClick}>
                        {MenuList.map(v=>(
                            <div key={v.name}
                            onClick={() => handleMenuClick(v.name)} 
                            className={selectedMenu === v.name ? "active" : ""}>        
                            {v.name} 
                          </div>
                        ))}
                    </div>
                    <a href="/"><div className="nav2" >
                     iMMUTABLE
                    </div></a>
                    <div className="nav3">
                    {isLogin==="FALSE" && IsLoginFalse.map(s=> (
                                        <TopButton key={s.name}>
                                            <Link to="/Login">{s.name}</Link>
                                        </TopButton>
                                    ))}
                          {isLogin==="TRUE" && IsLoginTrue.map(s=> ( 
                                        <TopButton key={s.name} onClick={()=>onChangePage(s.name)}>
                                            {s.name}
                                        </TopButton>
                                    ))}
                            
                    </div>
                </div>
                {selectedMenu === "iMMUTABLE" && <DropdownMenu  />} 
            </Head>
            </Mainbody>
       </Container>  
       
     )
 };
 
 
 export default Header;        