package com.kh.iMMUTABLE.entity;

import com.kh.iMMUTABLE.dto.ChatMessageDto;
import com.kh.iMMUTABLE.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
@Getter
public class ChatRoom {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
    public void handlerActions(WebSocketSession session, ChatMessageDto chatMessage, ChatService chatService) {

        if(chatMessage.getType().equals(ChatMessageDto.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSender() + "님이 입장했습니다.");
        }
        System.out.println("ChatRoom : " + chatMessage.getMessage());
//        chatService.saveLastMessage(chatMessage.getRoomId(), chatMessage.getMessage());
        sendMessage(chatMessage, chatService);
    }
    private <T> void sendMessage(T message, ChatService chatService) {
        // forEach() : 스트림의 요소를 하나씩 참조해서 람다식으로 처리하는 반복자
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }
}

