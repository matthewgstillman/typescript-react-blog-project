import { Router } from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers } from '../controllers/UserController';
import { protect } from '../middleware/authMiddleware';
import rateLimit from 'express-rate-limit';
import { body } from 'express-validator';

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

router.use('/login', apiLimiter);
router.use('/register', apiLimiter);

const registrationValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 8 characters long and contain at least one uppercase letter and one punctuation character')
      .isLength({ min: 8 })
      .matches(/.*[A-Z].*/)
      .matches(/.*[!@#$%^&*(),.?":{}|<>].*/)
  ];

const loginValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Password cannot be empty').not().isEmpty()
];

router.post('/register', registrationValidation, registerUser);
router.post('/login', loginValidation, loginUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get('/', getAllUsers);

export default router;