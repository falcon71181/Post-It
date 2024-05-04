type PostType = {
    // id: string
    title: string;
    body: string;
    likes: string;
    dislikes: string;
    user_id: string;
    // created_on: string;
    // updated_on: string;
}

type CreatePostReq = {
    Body: {
        title: string;
        body: string;
    }
}

type GetPostReq = {
    Params: {
        postId: string
    }
}

export type {
    PostType,
    CreatePostReq,
    GetPostReq
};
