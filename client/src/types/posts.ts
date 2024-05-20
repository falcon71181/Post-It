type PostDataType = {
  id: number;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  leader: string;
  created_on: Date;
  updated_on: Date;
}

type IndividualPostDataType = PostDataType & {
  replies?: string[] // xxx: for now
}

export type { PostDataType, IndividualPostDataType };
