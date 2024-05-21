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
  parent_reply_id: number | null;
  body: string;
  likes: number;
  dislikes: number;
  leader: string;
  created_on: Date;
}

type IndividualPostDataType = {
  post: PostDataType;
  replies?: ReplyType[]; // xxx: for now
}

export type { ReplyType, PostDataType, IndividualPostDataType };
