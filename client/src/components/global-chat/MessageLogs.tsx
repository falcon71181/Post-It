import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";
import type { Message } from "@/app/global/page";

type MessageLogProps = {
  messages: Message[]
}

const MessageLogs = ({ messages }: MessageLogProps) => {
  const messageLogsRef = useRef<HTMLDivElement>(null);

  // Automatically scroll 
  useEffect(() => {
    const messageLogs = messageLogsRef.current;
    if (messageLogs) {
      messageLogs.scrollTop = messageLogs.scrollHeight;
    }
  }, [messages]);

  return (
    <section
      ref={messageLogsRef}
      className="flex flex-col gap-2 h-[calc(100vh-7.5rem)] overflow-y-auto"
    >
      {messages.map((message) => (
        <MessageCard
          key={message.messageObj.createdOn?.toString() + message.messageObj.username}
          data={message}
        />
      ))}
    </section>
  );
};

export default MessageLogs;
