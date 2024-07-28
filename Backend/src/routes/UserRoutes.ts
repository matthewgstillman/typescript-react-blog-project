import { Router } from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/UserController';
import { protect } from '../middleware/authMiddleware';
import rateLimit from 'express-rate-limit';

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many accounts created from this IP, please try again after 15 minutes'
});

router.use('/login', apiLimiter);
router.use('/register', apiLimiter);

const registrationValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
];

const loginValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password cannot be empty').not().isEmpty(),
];

router.post('/register', registrationValidation, registerUser);

router.post('/login', loginValidation, loginUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;
