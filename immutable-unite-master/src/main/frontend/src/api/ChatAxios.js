import axios from "axios";
const Final_proj = "";

const ChatAxios = {
// 채팅방 개설 API

    chatRoomOpen: async function(name) {
        const chatObject = {
            "name" : name
        }
        return await axios.post(Final_proj + "/chat/room", chatObject);
    },
    saveChatData: async function(roomName,userId) {
        const saveChatData= {
            "roomName" : roomName,
            "userId" : userId,
        }
        return await axios.post(Final_proj + "/chat/saveChatData", saveChatData);
    },
    removeChatData: async function(roomName) {
        const removeChatData= {
            "roomName" : roomName
        }
        return await axios.post(Final_proj + "/chat/removeChatData", removeChatData);
    },
    updateChatData: async function(roomName,lastMessage) {
        const updateChatData= {
            "roomName" : roomName,
            "lastMessage" : lastMessage
        }
        return await axios.post(Final_proj + "/chat/updateChatData", updateChatData);
    }
};
export default ChatAxios;
