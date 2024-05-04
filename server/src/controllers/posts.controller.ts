import type { FastifyReply, FastifyRequest } from "fastify";
import { pool } from "../database/db";
import { createPostsTable } from "../database/posts";
import type { QueryResult } from "pg";
import type {
    CreatePostReq,
    GetPostReq,
    PostType
} from "../types/posts";

const getAllPosts = async (_req: FastifyRequest, res: FastifyReply) => {
    try {
        await createPostsTable();
        const result: QueryResult<PostType> = await pool.query(`
            SELECT title, body, likes, dislikes, user_id 
            FROM posts
        `);
        const posts = result.rows;

        if (posts.length === 0) {
            const error = 'Not posts yet';
            return res.status(404).send({ error });
        }

        res.send({ posts });
    } catch (error) {
        console.error('Error getting all the posts.', error);
        throw error;
    }
}

const getPost = async (req: FastifyRequest<GetPostReq>, res: FastifyReply) => {
    const { postId } = req.params;

    try {
        await createPostsTable();
        const result: QueryResult<PostType> = await pool.query(`
            SELECT title, body, likes, dislikes, user_id 
            FROM posts 
            WHERE id = $1
        `, [postId]);

        const post = result.rows[0];

        if (!post) {
            const error = 'No post found';
            return res.status(404).send({ error });
        }

        res.send({ post });
    } catch (error) {
        console.error('Error getting post.', error);
        throw error;
    }
}

const createPost = async (req: FastifyRequest<CreatePostReq>, res: FastifyReply) => {
    const { title, body } = req.body;
    const { userId } = req.headers; // TODO: Need middleware for this to work

    try {
        await createPostsTable();
        const result: QueryResult<PostType> = await pool.query(`
            INSERT INTO posts (title, body, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING title, body, likes, dislikes, user_id
        `, [title, body, userId]);

        const newPost = result.rows[0];

        res.send(newPost);
    } catch (error) {
        console.error('Error occured on creating new post.', error);
        throw error;
    }
}

export {
    getAllPosts,
    getPost,
    createPost
};
