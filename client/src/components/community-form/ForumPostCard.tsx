"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { PostDataType } from "@/types/posts";
import Link from "next/link";
import { useState } from "react";
import { Date, getDate } from "@/lib/utils";

export function FormPostCard({ PostData }: { PostData: PostDataType }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative h-52 max-w-[900px] w-full overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-950 hover:border hover:border-l-yellow-500 hover:translate-x-1 transition-all duration-300 rounded-l-2xl"
    >
      {/* TODO: Style better for light theme */}
      <motion.div
        className="pointer-events-none dark:absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.6), transparent 80%)
					`,
        }}
      />
      <div className="h-full relative flex rounded-md border border-white/10 rounded-l-2xl">
        <LikeDislikeSection likes={PostData.likes} dislikes={PostData.dislikes} />
        <PostSection PostData={PostData} />
      </div>
    </div>
  );
}

const LikeDislikeSection = ({ likes, dislikes }: { likes: number; dislikes: number }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currentLikes, setCurrentLikes] = useState<number>(likes);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [currentDislikes, setCurrentDislikes] = useState<number>(dislikes);

  const toggleLikeButton = () => {
    if (isLiked) {
      setCurrentLikes(currentLikes - 1);
      setIsLiked(false);
    } else {
      if (isDisliked) {
        setIsDisliked(false);
        setCurrentDislikes(currentDislikes - 1);
      }
      setCurrentLikes(currentLikes + 1);
      setIsLiked(true);
    }
  };

  const toggleDislikeButton = () => {
    if (isDisliked) {
      setCurrentDislikes(currentDislikes - 1);
      setIsDisliked(false);
    } else {
      if (isLiked) {
        setCurrentLikes(currentLikes - 1);
        setIsLiked(false);
      }
      setCurrentDislikes(currentDislikes + 1);
      setIsDisliked(true);
    }
  };

  return (
    <section className="dark:bg-neutral-900 flex flex-col rounded-l-2xl">
      <div className={`${isLiked === true ? 'bg-green-600' : 'bg-green-300/40 hover:bg-green-300/30'} cursor-pointer px-4 group/like h-1/2 flex flex-col gap-2 items-center justify-center rounded-tl-2xl transition-colors duration-200`} onClick={toggleLikeButton}>
        <ChevronUpIcon className="dark:text-neutral-300 group-hover/like:text-green-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/like:text-neutral-50">{currentLikes}</span>
      </div>
      <div className={`${isDisliked === true ? 'bg-red-600' : 'bg-red-400/40 hover:bg-red-400/30'} cursor-pointer px-4 group/like h-1/2 flex flex-col gap-2 items-center justify-center rounded-bl-2xl transition-colors duration-200`} onClick={toggleDislikeButton}>
        <ChevronDownIcon className="dark:text-neutral-300 group-hover/dislike:text-red-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/dislike:text-neutral-50">{currentDislikes}</span>
      </div>
    </section>
  )
}

const PostSection = ({ PostData }: { PostData: PostDataType }) => {
  console.log(PostData.noofreplies);
  return (
    // TODO: SQL injection possible | find another way to fetch /post/:page data
    <Link href={`/post/${PostData.id}`} className="w-full p-3 flex flex-col gap-1 rounded-r-md">
      <div className="h-[20%] flex items-center gap-3 text-xs">
        {/* TODO: Post tags in future <span>#Updates</span> */}
        <span>{getDate(PostData.created_on)}</span>
      </div>
      <div className="h-[20%] text-lg dark:text-neutral-100 font-semibold line-clamp-1">{PostData.title}</div>
      <div className="h-[25%] text-sm dark:text-neutral-300 line-clamp-2">{PostData.body}</div>
      <div className="h-[30%] w-full flex gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <PersonIcon className="dark:text-neutral-100" />
          <span className="text-sm">{PostData.leader}</span>
        </div>
        <div className="flex items-center gap-2">
          <ChatBubbleIcon />
          <span className="text-sm">{PostData.noofreplies}</span>
        </div>
      </div>
    </Link>
  )
}
