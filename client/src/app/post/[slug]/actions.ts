import { ReplyType } from "@/types/posts";

export type ReplyCreated = {
  reply: ReplyType | null;
  error: string | null;
}

type CreateReply = {
  body: string;
}

const SERVER = process.env.NEXT_PUBLIC_SERVER as string;

const createReplyWithPostId = (postId: number) => {
  return async (_prevState: any, formData: FormData) => {
    return createReply(_prevState, formData, postId);
  };
};

const createReply = async (_prevState: any, formData: FormData, postId: number) => {
  const formBody: CreateReply = {
    body: formData.get("body") as string,
  }

  // TODO: Add validation

  let newState: ReplyCreated = {
    reply: null,
    error: null,
  }

  try {
    const res = await fetch(`${SERVER}/posts/reply/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(formBody),
      cache: 'no-cache'
    })

    const data = await res.json();

    if (res.ok) {
      newState.reply = {
        body: formBody.body,
        likes: 0,
        dislikes: 0,
        leader: localStorage.getItem('username') || "",
        created_on: new Date(),
        parent_reply_id: null
      }
    }

    if (!res.ok) {
      throw new Error(data.error);
    }
  } catch (error) {
    if (error instanceof Error) {
      newState.error = error.message;
    }
  }

  return newState;
}

export { createReply, createReplyWithPostId };
