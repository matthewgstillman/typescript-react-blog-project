import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Post from '../models/Post';

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error('Please add a title and content');
    }

    const post = await Post.create({
        title,
        content,
        author: req.user._id,
    });

    if (post) {
        res.status(201).json(post);
    } else {
        res.status(400);
        throw new Error('Invalid post data');
    }
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
    const posts = await Post.find().populate('author', 'firstName lastName');
    res.status(200).json(posts);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id).populate('author', 'firstName lastName');

    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (post) {
        const comment = {
            text,
            author: req.user._id, 
        };

        post.comments.push(comment);
        await post.save();
        res.status(201).json({ message: 'Comment added' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
});
