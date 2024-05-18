import { socket } from "@/lib/socket";
import type { Message } from "@/app/global/page";

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
            {
              new Date(Number(data.messageObj.createdOn) * 1000)
                .toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })
                .replace(',', '')
                .replace(/\//g, '-')
            }
          </code>
        )}
      </code>
    </pre>
  )
}

export default MessageCard;
