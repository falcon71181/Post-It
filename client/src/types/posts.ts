type PostDataType = {
  id: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  leader: string;
  created_on: Date;
  updated_on: Date;
  noofreplies: number;
}

type ReplyType = {
  id: number;
  post_id: number;
  parent_reply_id: number | null;
  body: string;
  likes: number;
  dislikes: number;
  user_id: number;
  created_on: Date;
}

type IndividualPostDataType = PostDataType & {
  replies?: ReplyType[] // xxx: for now
}

export type { PostDataType, IndividualPostDataType };
