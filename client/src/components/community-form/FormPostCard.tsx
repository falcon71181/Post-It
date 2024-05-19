"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { ChevronUpIcon, ChevronDownIcon, PersonIcon } from "@radix-ui/react-icons";

type FormPostCardProps = {
  title: string,
  description: string
}

export function FormPostCard({ PostData }: { PostData: FormPostCardProps }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className="group relative h-52 max-w-[900px] w-full overflow-hidden rounded-md bg-neutral-200 dark:bg-neutral-950"
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
        <LikeDislikeSection />
        <PostSection PostData={PostData} />
      </div>
    </div>
  );
}

const LikeDislikeSection = () => {
  return (
    <section className="cursor-pointer dark:bg-neutral-900 flex flex-col rounded-l-2xl">
      <div className="px-4 group/like h-1/2 flex flex-col gap-2 items-center justify-center rounded-tl-2xl hover:bg-green-300/30">
        <ChevronUpIcon className="dark:text-neutral-300 group-hover/like:text-green-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/like:text-neutral-50">1001</span>
      </div>
      <div className="px-4 group/dislike h-1/2 flex flex-col gap-2 items-center justify-center rounded-bl-2xl hover:bg-red-300/30">
        <ChevronDownIcon className="dark:text-neutral-300 group-hover/dislike:text-red-300" />
        <span className="text-xs font-semibold dark:text-neutral-100 group-hover/dislike:text-neutral-50">1001</span>
      </div>
    </section>
  )
}

const PostSection = ({ PostData }: { PostData: FormPostCardProps }) => {
  return (
    <section className="w-full p-3 flex flex-col gap-1 rounded-r-md">
      <div className="h-[20%] flex items-center gap-3 text-xs">
        <span>#Updates</span>
        <span>9 days ago</span>
      </div>
      <div className="h-[20%] text-lg dark:text-neutral-100 font-semibold line-clamp-1">{PostData.title}</div>
      <div className="h-[25%] text-sm dark:text-neutral-300 line-clamp-2">{PostData.description}</div>
      <div className="h-[30%] flex gap-2 items-center">
        <PersonIcon className="dark:text-neutral-100" />
        <span className="text-sm">username</span>
      </div>
    </section>
  )
}
