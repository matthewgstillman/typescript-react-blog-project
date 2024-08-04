"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.route('/')
    .post(authMiddleware_1.protect, PostController_1.createPost)
    .get(PostController_1.getPosts);
router.route('/:id')
    .get(PostController_1.getPostById)
    .put(authMiddleware_1.protect, PostController_1.updatePost);
router.route('/:id/comments')
    .post(authMiddleware_1.protect, PostController_1.addComment);
exports.default = router;
