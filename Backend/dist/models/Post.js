"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
const PostSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [CommentSchema]
}, { timestamps: true });
exports.default = mongoose_1.default.model('Post', PostSchema);
