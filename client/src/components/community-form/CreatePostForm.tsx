'use client'

import { useState, useEffect, Dispatch, SetStateAction, FormEvent } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { useAuthContext } from "@/contexts/auth"
import { createPost, PostCreated, CreatePost } from "@/app/actions"
import type { PostDataType } from "@/types/posts"

const initialState: PostCreated = {
  post: null,
  error: null,
}

const PostForm = ({ postData, setPostData, setFormDailog }: { postData: PostDataType[] | null, setPostData: Dispatch<SetStateAction<PostDataType[] | null>>, setFormDailog: Dispatch<SetStateAction<boolean>> }) => {
  const [state, formAction] = useFormState(createPost, initialState);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!pending && state.post) {
      const newPost: PostDataType = state.post;
      newPost.created_on = new Date();
      newPost.leader = localStorage.getItem('username') || "";
      postData?.reverse().push(newPost);
      setPostData(postData?.reverse() || []);
      setFormDailog(false);
    } else {
    }
  }, [pending, state.post, setFormDailog, setPostData, postData]);

  return (
    <form className='flex flex-col gap-4 p-5' action={formAction}>
      <h1 className="font-semibold text-2xl md:text-3xl transition-all duration-500">Create New Post</h1>
      <h1 className="text-xs md:text-sm text-neutral-400">Enter your post details to create a new post.</h1>
      <h1 className="text-sm md:text-base dark:text-neutral-300">Enter Title</h1>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Thread Title"
        className='bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        required
      />
      <h1 className="text-sm md:text-base dark:text-neutral-300 col-span-3">Enter Description</h1>
      <textarea
        id="body"
        name="body"
        placeholder="Description"
        rows={5}
        className='bg-background border border-border text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        required
      />
      {state.error && (
        <div className="w-full flex justify-center text-red-300 text-sm">{state.error}</div>
      )}
      <button
        type="submit"
        aria-disabled={pending}
        className={`${pending ? 'cursor-wait' : 'cursor-pointer'} col-span-3 w-full px-3 py-2 mt-5 text-base md:text-lg dark:text-black font-semibold flex items-center justify-center rounded-md border border-border cursor-pointer bg-neutral-300 hover:bg-neutral-300/80 select-none transition-all duration-200`}>
        {pending ? 'Loading...' : 'Create New Post'}
      </button>
    </form>
  )
}

export default PostForm;
