import React  from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container =styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
    font-size: 12px;
    width: 320px;
    height: 380px;
    display: flex;
    justify-content: center;
    align-items: center;

    .errorMessage{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    .login{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    input{
        border: 1px solid #CCC;
        margin: 20px 0 0 0;
        height: 30px;
        &::placeholder{
            padding: 5px;
            font-size: 10px;
        }
    }
    button{
        width: 320px;
        margin: 20px 0 0 0;
        height: 30px;
        font-size: 10px;
        border: 1px solid #CCC;
        background-color: white;
        &:hover{
            background-color: black;
            color: white;
        }
    }

`

const Admin401Error =()=>{
    const navigate = useNavigate();
    const onClickLogin=  async() =>{
            navigate("/adminPage")
    }
    window.localStorage.setItem("isLoginAdminPage", "FALSE");
    return(
        <Container>
            <Body>
            <div className="mainBody">
                <div className="errorMessage">
                    <h1>Sorry for LOGIN ERROR</h1>
                    Login time has been expired. Please log in again.
                </div>
                <div className="login">
                    <button onClick={onClickLogin}>LOGIN</button>
                </div>
            </div>
            </Body>
        </Container>
    );
};

export default Admin401Error;

