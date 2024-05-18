import { Dispatch, FormEvent, SetStateAction } from "react";
import { RocketIcon } from "@radix-ui/react-icons";

type MessageFormProps = {
  "message": string,
  "setMessage": Dispatch<SetStateAction<string>>,
  "handleSendMessage": (messageData: string) => void;
}

// TODO: make a limit to send message
const MessageForm = ({ message, setMessage, handleSendMessage }: MessageFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(message);
  };

  const handleClick = (_e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    handleSendMessage(message);
  };

  return (
    <form className="absolute bottom-0 w-full h-14 pb-3 flex gap-2 items-center" onSubmit={handleSubmit}>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-neutral-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        value={message}
        placeholder="Enter message to send."
        onChange={(e => setMessage(e.target.value))}
      />
      <RocketIcon className="size-10 cursor-pointer" onClick={handleClick} />
    </form>
  )
}

export default MessageForm;
