'use client'

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import type { IndividualPostDataType, ReplyType } from "@/types/posts";
import { ArrowDownIcon, ArrowLeftIcon, ArrowUpIcon, PaperPlaneIcon, ChatBubbleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const PostPage = ({ params }: { params: { slug: number } }) => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER as string;
  const [postData, setPostData] = useState<IndividualPostDataType | null>(null);
  const [toggleReplyForm, setToggleReplyForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (postId: number) => {
      try {
        const response = await fetch(`${SERVER}/posts/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setPostData(data as IndividualPostDataType);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchData(params.slug);
  }, [params.slug, SERVER]);
  return (
    <div className="w-full px-3 flex flex-col gap-3">
      <Link href="/"
        className="group h-full w-full flex gap-3 items-center"
      >
        <ArrowLeftIcon className="group-hover:translate-x-1 transition-transform duration-200" />
        <span className="text-lg">Back</span>
      </Link>
      <PostCard postData={postData} />
      <PostStatusCard postStatus={{ likes: postData?.post?.likes ?? 0, dislikes: postData?.post?.dislikes ?? 0, noOfReplies: postData?.replies?.length ?? 0 }} replyDialog={{ replyFormState: toggleReplyForm, setReplyForm: setToggleReplyForm }} />
      {toggleReplyForm &&
        <AddReplyCard />
      }
      {postData?.replies?.map((reply) => (
        <ReplyCard reply={reply} key={reply.id} />
      ))}
    </div>
  )
}

const PostCard = ({ postData }: { postData: IndividualPostDataType | null }) => {
  return (
    <div className="w-full min-h-[14vh] p-3 flex flex-col gap-3 border dark:border-neutral-500 border-cyan-300 rounded-md bg-background">
      <h1 className="text-3xl font-semibold">{postData?.post?.title}</h1>
      <div className="w-full text-gray-800 dark:text-neutral-400 text-sm flex justify-between items-center">
        <h1 className="font-caveat tracking-wider text-base">by {postData?.post?.leader}</h1>
        <h1>on {postData?.post?.created_on.toLocaleString()}</h1>
      </div>
      <p className="text-sm text-150 leading-6 tracking-wide">
        {postData?.post?.body}
      </p>
    </div>
  )
}

const PostStatusCard = ({ postStatus, replyDialog }: { postStatus: { likes: number, dislikes: number, noOfReplies: number }, replyDialog: { replyFormState: boolean, setReplyForm: Dispatch<SetStateAction<boolean>> } }) => {
  return (
    <div className="w-full h-12 rounded-md flex justify-between border border-border bg-background">
      <div className="flex">
        <div className="h-12 px-3 flex gap-2 items-center text-xs rounded-l-md border hover:border-border hover:bg-green-300/30 cursor-pointer transition-colors duration-200">
          <ArrowUpIcon />
          <h1>{postStatus.likes}</h1>
        </div>
        <div className="h-12 px-3 flex gap-2 items-center text-xs border hover:border-border hover:bg-red-400/30 cursor-pointer transition-colors duration-200">
          <ArrowDownIcon />
          <h1>{postStatus.dislikes}</h1>
        </div>
        <div className="h-12 px-3 flex gap-2 items-center text-xs rounded-r-md hover:bg-accent cursor-pointer transition-colors duration-200"
          onClick={() => replyDialog.setReplyForm(!replyDialog.replyFormState)}
        >
          <Pencil1Icon />
          <h1>Write a reply</h1>
        </div>
      </div>
      <div className="h-12 px-3 flex gap-2 items-center text-xs rounded-r-md hover:bg-accent cursor-pointer transition-colors duration-200">
        <ChatBubbleIcon />
        <h1>{postStatus.noOfReplies}</h1>
      </div>
    </div>
  )
}

const AddReplyCard = () => {
  return (
    <form id="replyForm">
      <div className="relative">
        <textarea
          rows={6}
          className="bg-background/70 border border-gray-500 p-2 w-full text-sm rounded-md outline-none focus:border-gray-200 cursor-text"
        />
        <button className='absolute right-0 bottom-0 mr-3 mb-4'>
          <PaperPlaneIcon className="size-5" />
        </button>
      </div>
    </form>
  )
}

const ReplyCard = ({ reply }: { reply: ReplyType }) => {
  return (
    <div className="w-full min-h-12 p-3 bg-background flex flex-col gap-3 border border-border rounded-lg">
      <div className="flex justify-between dark:text-neutral-400 text-gray-800">
        <h1 className="text-base font-caveat tracking-wider">by {reply.leader}</h1>
        <span className="text-xs">{reply.created_on.toLocaleString()}</span>
      </div>
      <p className="text-sm text-150 leading-6 tracking-wide">
        {reply.body}
      </p>
    </div>
  )
}

export default PostPage;
