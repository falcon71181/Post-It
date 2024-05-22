import { socket } from "@/lib/socket";
import type { Message } from "@/app/global/page";
import { getSec } from "@/lib/utils";

type MessageCardProps = {
  data: Message
}

const MessageCard = ({ data }: MessageCardProps) => {
  return (
    <pre className={`${socket.id === data.messageObj.socketId ? "border-l-yellow-500/50 bg-yellow-500/10" : "bg-transparent"} backdrop-blur-md p-2 w-full flex justify-between border border-border`}>
      <code className='flex items-center'>
        <h1 className="dark:text-muted-foreground text-lg shrink-0">{data.messageObj.username}:{" "}</h1>
        <code className="max-w-[80rem] w-full whitespace-normal break-words text-balance text-gray-600 dark:text-zinc-300">{data.messageObj.message}</code>
      </code>
      <code className='dark:text-muted-foreground shrink-0 lg:flex hidden items-center justify-center'>
        {data.messageObj.createdOn && (
          <code>
            {getSec(new Date(data.messageObj.createdOn))}
          </code>
        )}
      </code>
    </pre>
  )
}

export default MessageCard;
