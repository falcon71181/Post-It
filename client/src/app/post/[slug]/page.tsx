'use client'

import { useState, useEffect } from "react";
import type { IndividualPostDataType } from "@/types/posts";
import { ArrowDownIcon, ArrowLeftIcon, ArrowUpIcon, ChatBubbleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const PostPage = ({ params }: { params: { slug: number } }) => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER as string;
  const [postData, setPostData] = useState<IndividualPostDataType | null>(null);

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
      <PostCard postData={postData} />
      <PostStatusCard postStatus={{ likes: postData?.likes ?? 0, dislikes: postData?.dislikes ?? 0 }} />
    </div>
  )
}

const PostCard = ({ postData }: { postData: IndividualPostDataType | null }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Link href="/"
        className="group h-full w-full flex gap-3 items-center"
      >
        <ArrowLeftIcon className="group-hover:translate-x-1 transition-transform duration-200" />
        <span className="text-lg">Back</span>
      </Link>
      <div className="w-full min-h-[20vh] p-3 flex flex-col gap-3 border border-border rounded-md bg-background">
        <h1 className="text-3xl font-semibold">{postData?.title}</h1>
        <div className="w-full text-gray-800 dark:text-neutral-400 text-sm flex justify-between items-center">
          <h1 className="font-caveat tracking-wider">by {postData?.leader}</h1>
          <h1>on {postData?.created_on.toLocaleString()}</h1>
        </div>
        <p className="text-sm text-150 leading-6">
          {postData?.body}
        </p>
      </div>
    </div>
  )
}

const PostStatusCard = ({ postStatus }: { postStatus: { likes: number, dislikes: number } }) => {
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
        <div className="h-12 px-3 flex gap-2 items-center text-xs rounded-r-md hover:bg-accent cursor-pointer transition-colors duration-200">
          <Pencil1Icon />
          <h1>Write a reply</h1>
        </div>
      </div>
      <div className="h-12 px-3 flex gap-2 items-center text-xs rounded-r-md hover:bg-accent cursor-pointer transition-colors duration-200">
        <ChatBubbleIcon />
        <h1>6969</h1>
      </div>
    </div>
  )
}

export default PostPage;
