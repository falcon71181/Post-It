import { PostDataType } from "@/types/posts";

export type PostCreated = {
  post: PostDataType | null;
  error: string | null;
}

export type CreatePost = {
  title: string;
  body: string;
}

const SERVER = process.env.NEXT_PUBLIC_SERVER as string;

const createPost = async (_prevState: any, formData: FormData) => {
  const formBody: CreatePost = {
    title: formData.get("title") as string,
    body: formData.get("body") as string,
  }

  // TODO: Add validation

  let newState: PostCreated = {
    post: null,
    error: null,
  }

  try {
    const res = await fetch(`${SERVER}/posts`, {
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
      newState.post = {
        title: data.title,
        body: data.body,
        likes: data.likes,
        dislikes: data.dislikes,
        leader: data.leader,
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

const getPostData = async () => {
  try {
    const response = await fetch(`${SERVER}/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json();
      return data as PostDataType[];
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}

export { createPost, getPostData };
