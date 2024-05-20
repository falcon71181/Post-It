import type { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../database/db";
import type { QueryResult } from "pg";
import type {
  CreatePostReq,
  DeletePostReq,
  GetPostReq,
  PostType
} from "../types/posts";

const getAllPosts = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const result: QueryResult<PostType> = await pool.query(`
            SELECT posts.id, posts.title, posts.body, posts.likes, posts.dislikes, posts.created_on, posts.updated_on, users.username as leader
            FROM posts
            JOIN users
            ON posts.user_id = users.id
        `);
    const posts = result.rows;

    if (posts.length === 0) {
      const error = 'Not posts yet';
      return res.status(404).send({ error: error });
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
    const result: QueryResult<PostType> = await pool.query(`
            SELECT posts.title, posts.body, posts.likes, posts.dislikes, users.username as leader
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [Number(postId)]);

    const post = result.rows[0];

    if (!post) {
      const error = 'No post found';
      return res.status(404).send({ error: error });
    }

    res.send(post);
  } catch (error) {
    console.error('Error getting post.', error);
    throw error;
  }
}

const createPost = async (req: FastifyRequest<CreatePostReq>, res: FastifyReply) => {
  try {
    // TODO: add post tag
    let { title, body } = req.body;
    const username = req.username;

    title = title.trim();
    body = body.trim();

    if (title.length < 20 || title.length > 100) {
      return res.status(411).send({ error: "Title character limit is: [20, 100]" })
    }
    if (body.length < 50 || title.length > 2000) {
      return res.status(411).send({ error: "Body character limit is: [50, 2000]" })
    }

    const userResult: QueryResult<{ id: string }> = await pool.query(`
            SELECT id
            FROM users
            WHERE username = $1
        `, [username as string])

    const userId = userResult.rows[0].id;

    // NOTE: Check if this is needed or not
    if (!userId) {
      const error = 'User does not exist.'
      return res.status(404).send({ error: error });
    }

    const postResult: QueryResult<PostType> = await pool.query(`
            INSERT INTO posts (title, body, user_id) 
            VALUES ($1, $2, $3) 
            RETURNING title, body, likes, dislikes, user_id as leader
        `, [title as string, body as string, Number(userId)]);

    const newPost = postResult.rows[0];

    res.send(newPost);
  } catch (error) {
    console.error('Error occured on creating new post.', error);
    throw error;
  }
}

const deletePost = async (req: FastifyRequest<DeletePostReq>, res: FastifyReply) => {
  const { postId } = req.params;
  const username = req.username as string;
  const email = req.email as string;

  try {
    // NOTE: Check if this is needed or not
    const postResult: QueryResult<{ id: string }> = await pool.query(`
            SELECT id
            FROM posts
            WHERE posts.id = $1
        `, [Number(postId)])

    const postExists = postResult.rows[0];

    if (!postExists) {
      const error = 'No post found';
      return res.status(404).send({ error: error });
    }

    // Check for user being authenticated for operation
    const userResult: QueryResult<{ username: string, email: string }> = await pool.query(`
            SELECT username, email
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [Number(postId)])

    const user = userResult.rows[0];

    // both username and email should match
    // INFO: giving permission to admin to delete any post
    if (!req.isAdmin && (user.username != username || user.email != email)) {
      const error = 'Anauthorized action';
      return res.status(401).send({ error: error });
    }

    // Actually deleting 
    await pool.query(`
            DELETE FROM posts
            WHERE id = $1
        `, [Number(postId)])

    res.send();
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
