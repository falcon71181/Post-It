import type { FastifyRequest, FastifyReply } from "fastify";
import { pool } from "../database/db";
import type { QueryResult } from "pg";
import type {
  CreatePostReq,
  DeletePostReq,
  GetPostReq,
  PostType,
  CreateReplyReq,
} from "../types/posts";

const getAllPosts = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const result: QueryResult<PostType> = await pool.query(`
SELECT 
    posts.id, 
    posts.title, 
    posts.body, 
    posts.likes, 
    posts.dislikes, 
    posts.created_on, 
    posts.updated_on, 
    users.username as leader, 
    COUNT(replies.id) as noOfReplies
FROM 
    posts
JOIN 
    users ON posts.user_id = users.id
LEFT JOIN 
    replies ON posts.id = replies.post_id
GROUP BY 
    posts.id, 
    posts.title, 
    posts.body, 
    posts.likes, 
    posts.dislikes, 
    posts.created_on, 
    posts.updated_on, 
    users.username
        `);
    const posts = result.rows;

    if (posts.length === 0) {
      const error = 'Not posts yet';
      return res.status(404).send({ error: error });
    }

    res.send(posts);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

const getPost = async (req: FastifyRequest<GetPostReq>, res: FastifyReply) => {
  const { postId } = req.params;

  try {
    let replies = [];
    const result: QueryResult<PostType> = await pool.query(`
            SELECT posts.id, posts.title, posts.body, posts.likes, posts.dislikes, posts.created_on, posts.updated_on, users.username as leader
            FROM posts
            JOIN users
            ON posts.user_id = users.id
            WHERE posts.id = $1
        `, [Number(postId)]);

    const repliesData: QueryResult = await pool.query(`
            SELECT * FROM replies WHERE post_id = $1
        `, [Number(postId)]);

    const post = result.rows[0];
    replies = [...repliesData.rows];

    if (!post) {
      const error = 'No post found';
      return res.status(404).send({ error: error });
    }

    res.send({ post, replies });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
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
    return res.status(500).send({ error: "Internal Server Error" });
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
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

const createReply = async (req: FastifyRequest<CreateReplyReq>, res: FastifyReply): Promise<void> => {
  const { postId } = req.params;
  const username = req.username as string;
  const email = req.email as string;
  try {
    let { body } = req.body;
    body = body.trim();
    if (body.length < 10 || body.length > 1000) {
      return res.status(411).send({ error: "Body character limit is: [10, 1000]" })
    }

    const userResult: QueryResult<{ id: string }> = await pool.query(`
            SELECT id
            FROM users
            WHERE username = $1 AND email = $2
        `, [username as string, email as string]);

    const userId = userResult.rows[0].id;

    // NOTE: Check if this is needed or not
    if (!userId) {
      const error = 'User does not exist.'
      return res.status(404).send({ error: error });
    }

    await pool.query("INSERT INTO replies (user_id, body, post_id) VALUES ($1, $2, $3)", [Number(userId), body as string, Number(postId)]);

    return res.send({ message: "Reply added successfully." });
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

export {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
  createReply,
};
