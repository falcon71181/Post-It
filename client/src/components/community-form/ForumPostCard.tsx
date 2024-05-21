"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PersonIcon, ChatBubbleIcon } from "@radix-ui/react-icons";
import { PostDataType } from "@/types/posts";
import Link from "next/link";

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

const LikeDislikeSection = ({ likes, dislikes }: { likes: number, dislikes: number }) => {
  return (
    <section className="cursor-pointer dark:bg-neutral-900 flex flex-col rounded-l-2xl">
      <div className="px-4 group/like h-1/2 flex flex-col gap-2 items-center justify-center rounded-tl-2xl hover:bg-green-300/30 transition-colors duration-200">
        <ChevronUpIcon className="dark:text-neutral-300 group-hover/like:text-green-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/like:text-neutral-50">{likes}</span>
      </div>
      <div className="px-4 group/dislike h-1/2 flex flex-col gap-2 items-center justify-center rounded-bl-2xl hover:bg-red-300/30 transition-colors duration-200">
        <ChevronDownIcon className="dark:text-neutral-300 group-hover/dislike:text-red-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/dislike:text-neutral-50">{dislikes}</span>
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
        <span>{PostData.created_on.toString()}</span>
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
