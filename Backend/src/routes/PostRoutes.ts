import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, addComment } from '../controllers/PostController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost);

router.route('/:id/comments')
  .post(protect, addComment);

export default router;
