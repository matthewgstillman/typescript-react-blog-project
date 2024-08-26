import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Post from '../models/Post';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

export const createPost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: 'Title and content are required' });
    return;
  }

  const post = await Post.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await Post.find().populate('author', 'firstName lastName');
  res.json(posts);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id).populate('author', 'firstName lastName');
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

export const updatePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ message: 'Not authorized to update this post' });
      return;
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

export const addComment = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: 'Not authorized' });
    return;
  }

  const { text } = req.body;

  if (!text) {
    res.status(400).json({ message: 'Comment text is required' });
    return;
  }

  const post = await Post.findById(req.params.id);
  
  if (post) {
    const comment = {
      text,
      author: req.user._id,
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});
