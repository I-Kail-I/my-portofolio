import { Router } from 'express';
import { loginController } from '../controller/login.controller.js';
import { logoutController } from '../controller/logout.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { profileController } from '../controller/profile.controller.js';

const route = Router();

// Unprotected routes
route.post('/login', loginController);

// Protected routes
route.get('/profile', verifyToken, profileController);
route.post('/logout', verifyToken, logoutController);

export default route;
