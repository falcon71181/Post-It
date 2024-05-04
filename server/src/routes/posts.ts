import type { FastifyInstance } from "fastify";
import { createPost, getAllPosts, getPost } from "../controller/posts.controller";

const postRoutes = async (app: FastifyInstance) => {
    app.get('/', getAllPosts);
    app.put('/', createPost); // TODO: Run through middleware for user auth 
    app.get('/:postId', getPost);

    // TODO: Get these done soon
    // app.delete('/:postId', () => {}) // Delete 'postId' post
    // app.patch('/:postId', () => {}) // Update 'postId' post

    // NOTE: Think something about this later 
    // TODO: Get post (with postId)/all posts from perticular user (userId)
    // app.post('/:userId/:postId', () => {})
    // OR 
    // app.post('/users/:userId/posts/:postId', () => {})
}

export default postRoutes;
