"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
router.use('/login', apiLimiter);
router.use('/register', apiLimiter);
const registrationValidation = [
    (0, express_validator_1.body)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];
const loginValidation = [
    (0, express_validator_1.body)('email', 'Invalid email').isEmail(),
    (0, express_validator_1.body)('password', 'Password cannot be empty').not().isEmpty()
];
router.post('/register', registrationValidation, UserController_1.registerUser);
router.post('/login', loginValidation, UserController_1.loginUser);
router.route('/profile')
    .get(authMiddleware_1.protect, UserController_1.getUserProfile)
    .put(authMiddleware_1.protect, UserController_1.updateUserProfile);
exports.default = router;
