"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Post_1 = __importDefault(require("../models/Post"));
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    const post = yield Post_1.default.create({
        title: req.body.title,
        content: req.body.content,
        author: req.user._id
    });
    res.status(201).json(post);
}));
exports.getPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.default.find().populate('author', 'firstName lastName');
    res.json(posts);
}));
exports.getPostById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById(req.params.id).populate('author', 'firstName lastName');
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ message: 'Post not found' });
    }
}));
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    const post = yield Post_1.default.findById(req.params.id);
    if (post) {
        if (post.author.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to update this post' });
            return;
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        const updatedPost = yield post.save();
        res.json(updatedPost);
    }
    else {
        res.status(404).json({ message: 'Post not found' });
    }
}));
exports.addComment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized' });
        return;
    }
    const post = yield Post_1.default.findById(req.params.id);
    if (post) {
        const comment = {
            text: req.body.text,
            author: req.user._id
        };
        post.comments.push(comment);
        yield post.save();
        res.status(201).json(post);
    }
    else {
        res.status(404).json({ message: 'Post not found' });
    }
}));
