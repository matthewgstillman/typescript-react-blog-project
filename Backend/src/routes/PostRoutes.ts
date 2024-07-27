import { Router } from 'express';
import { createPost, getPosts, getPostById, addComment } from '../controllers/PostController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.route('/').post(protect, createPost).get(getPosts);
router.route('/:id').get(getPostById).post(protect, addComment);

export default router;
