import type { FastifyInstance } from "fastify";
import { createPost, getAllPosts, getPost } from "../controllers/posts.controller";
import { isAuth } from "../middlewares/authReq";

const postRoutes = async (app: FastifyInstance) => {
    app.get('/', getAllPosts);
    app.post('/', { preHandler: isAuth }, createPost);
    app.get('/:postId', getPost);

    // TODO: Get these done soon
    // app.delete('/:postId', () => {}) // Delete 'postId' post
    // app.patch('/:postId', () => {}) // Update 'postId' post

    // NOTE: Think something for this later 
    // TODO: Get post (with postId)/all posts from perticular user (userId)
    // app.post('/:userId/:postId', () => {})
    // OR 
    // app.post('/users/:userId/posts/:postId', () => {})
}

export default postRoutes;
