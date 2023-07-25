import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserInfo";
import AdminChatSocket from "../chatPage/AdminChatSocket";
import ChatAxios from "../api/ChatAxios.js";

//전체 컨테이너 CSS
const Container=styled.div`
    width: 100%;
    height: calc(100vh - 180px);
    display: flex;   
`
//채팅리스트가 보여지는 CSS
const ChatListView=styled.div`
    width: 50%;
    flex-direction: column;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;
    }
`
//채팅 목록의 데이터가 들어가는CSS
const ChatListData=styled.div`
    height: 100px;
    border-bottom: 1px solid #CCC;
    border-left: 1px solid #CCC;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    &:hover{
        background-color: #CCC;
    }
    .userName{
        margin-left: 20px;
        width: 90%;
        height: 20px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
    .deleteChatRoom{
        width: 15px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #CCC;
        border-radius: 50%;
        color: white;
        &:hover{
            color: black;
        }
    }
    .lastMessage{
        margin-left: 20px;
        width: 480px;
        font-size: 21px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
`
//채팅UI
const ChattingData=styled.div`
    height:100%;
    border-left:1px solid #CCC;
    border-bottom: 1px solid #CCC;
    border-right: 1px solid #CCC;
`
const ChatList=(props)=>{
    console.log(props);
    const {dataReload} = props;
    const context = useContext(UserContext);
    const {chatList} = context;
    console.log(chatList);

    //방ID를 담을 useState
    const [onRoomId,setOnRoomId]=useState();
    const onFindRoomId=(roomId)=>{
        setOnRoomId(roomId);
    }
    const onDeleteMessage= async(e)=>{
        const response = await ChatAxios.removeChatData(e);
    }
    return(
        <Container> 
          <ChatListView>
            {chatList && chatList.map((l,index)=>
                  <ChatListData key={l.roomName} onClick={()=>onFindRoomId(l.roomName)}>
                    <div className="userName">
                        {l.userId}
                         <button className="deleteChatRoom" onClick={()=>{onDeleteMessage(l.roomName);dataReload(false);}}>&times;</button>
                    </div>
                    <div className="lastMessage">
                        {l.lastMessage}
                    </div>
                  </ChatListData>)}
          </ChatListView>

          <ChatListView>
               <ChattingData>
                    <AdminChatSocket setRoomId={onRoomId}/>
               </ChattingData>
          </ChatListView>
        
        </Container>
    );
};

export default ChatList;
