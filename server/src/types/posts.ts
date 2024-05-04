import type { RouteGenericInterface } from "fastify";

type PostType = {
    // id: string
    title: string;
    body: string;
    likes: string;
    dislikes: string;
    username: string;
    // created_on: string;
    // updated_on: string;
}

type CreatePostReq = {
    Body: {
        title: string;
        body: string;
    }
} & RouteGenericInterface;

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
