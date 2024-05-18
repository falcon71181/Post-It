"use client"

import { socket } from "@/lib/socket";
import { useState, useEffect } from "react";
import MessageForm from "@/components/global-chat/MessageForm";
import MessageLogs from "@/components/global-chat/MessageLogs";

export type Message = {
  "type": "send" | "receive" | "user-log",
  "messageObj": {
    "username": string,
    "socketId": string,
    "createdOn": number,
    "message": string
  }
}

// TODO : make a user-logs
const GlobalChat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [sendMessageData, setSendMessageData] = useState('');
  const [messagelogs, setMessageLogs] = useState<Message[]>([]);

  const handleSendMessage = (messageData: string) => {
    const messageObj: Message = {
      type: "send",
      messageObj: {
        username: localStorage.getItem("username") || "Anon",
        socketId: socket.id as string,
        createdOn: Number(Date.now()),
        message: messageData,
      }
    }

    setSendMessageData('');

    // setMessageLogs((prevMessages) => {
    //   return [...prevMessages, messageObj];
    // });

    socket.emit("send-message", messageObj);
  }

  const handleReceivedMessage = (messageObj: Message) => {
    // to not print back the sent-message as received-message
    // if (messageObj.messageObj.socketId === socket.id) return;
    setMessageLogs((prevMessages) => {
      return [...prevMessages, messageObj];
    });
  }

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onReceive = (messageObj: Message) => {
      handleReceivedMessage(messageObj);
    }

    socket.on("user-joined", onConnect);
    socket.on("user-left", onDisconnect);
    socket.on("receive-message", onReceive);

    return () => {
      // clean uo 
      socket.off("user-joined", onConnect);
      socket.off("user-left", onDisconnect);
      socket.off("receive-message", onReceive);
    }
  }, [])

  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)]">
      {isConnected && (
        <MessageLogs messages={messagelogs} />
      )}
      <MessageForm message={sendMessageData} setMessage={setSendMessageData} handleSendMessage={handleSendMessage} />
    </section>
  )
}

export default GlobalChat;
