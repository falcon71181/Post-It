import type { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../database/db";
import { createPostsTable } from "../database/posts";
import type { Query, QueryResult } from "pg";
import type {
    CreatePostReq,
    DeletePostReq,
    GetPostReq,
    PostType
} from "../types/posts";
import { createUserTable } from "../database/users";

const getAllPosts = async (_req: FastifyRequest, res: FastifyReply) => {
    try {
        await createPostsTable();
        const result: QueryResult<PostType> = await pool.query(`
            SELECT posts.title, posts.body, posts.likes, posts.dislikes, users.username
            FROM posts
            JOIN users
            ON posts.user_id = users.id
        `);
        const posts = result.rows;

        if (posts.length === 0) {
            const error = 'Not posts yet';
            return res.status(404).send({ error });
        }

        res.send(posts);
    } catch (error) {
        console.error('Error getting all the posts.', error);
        throw error;
    }
}

const getPost = async (req: FastifyRequest<GetPostReq>, res: FastifyReply) => {
    const { postId } = req.params;

    try {
        await createUserTable();
        await createPostsTable();

        const result: QueryResult<PostType> = await pool.query(`
            SELECT posts.title, posts.body, posts.likes, posts.dislikes, users.username
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [postId]);

        const post = result.rows[0];

        if (!post) {
            const error = 'No post found';
            return res.status(404).send({ error });
        }

        res.send(post);
    } catch (error) {
        console.error('Error getting post.', error);
        throw error;
    }
}

const createPost = async (req: FastifyRequest<CreatePostReq>, res: FastifyReply) => {
    const { title, body } = req.body;
    const username = req.username;

    try {
        await createUserTable();
        const userResult: QueryResult<{ id: string }> = await pool.query(`
            SELECT id
            FROM users
            WHERE username = $1
        `, [username])

        const userId = userResult.rows[0].id;

        // NOTE: Check if this is needed or not
        if (!userId) {
            const error = 'User does not exist.'
            return res.status(404).send({ error });
        }

        await createPostsTable();
        const postResult: QueryResult<PostType> = await pool.query(`
            INSERT INTO posts (title, body, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING title, body, likes, dislikes, user_id
        `, [title, body, userId]);

        const newPost = postResult.rows[0];

        res.send(newPost);
    } catch (error) {
        console.error('Error occured on creating new post.', error);
        throw error;
    }
}

const deletePost = async (req: FastifyRequest<DeletePostReq>, res: FastifyReply) => {
    const { postId } = req.params;
    const username = req.username;

    try {
        // CHeck for post existance
        await createPostsTable();
        // NOTE: Check if this is needed or not
        const postResult: QueryResult<{ id: string }> = await pool.query(`
            SELECT id
            FROM posts
            WHERE posts.id = $1
        `, [postId])

        const postExists = postResult.rows[0];

        if (!postExists) {
            const error = 'No post found';
            return res.status(404).send({ error });
        }

        // Check for user being authenticated for operation
        const userResult: QueryResult<{ username: string }> = await pool.query(`
            SELECT username
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [postId])

        const user = userResult.rows[0];

        if (user.username != username) {
            const error = 'Anauthorized action';
            return res.status(401).send({ error });
        }

        // Actually deleting 
        // TODO: Find a way to get username from RETURNING
        const result: QueryResult<Omit<PostType, 'username'>> = await pool.query(`
            DELETE FROM posts
            WHERE id = $1
            RETURNING title, body, likes, dislikes
        `, [postId])

        const post = result.rows[0];

        res.send(post);
    } catch (error) {
        console.error("Error occured on deleting a post.", error);
        throw error;
    }
}

export {
    getAllPosts,
    getPost,
    createPost,
    deletePost
};
