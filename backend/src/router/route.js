import { Router } from 'express';
import { loginController } from '../controller/login.controller.js';
import { logoutController } from '../controller/logout.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { profileController } from '../controller/profile.controller.js';
import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from '../controller/experience.controller.js';

const route = Router();

// Unprotected routes
route.post('/login', loginController);
route.get('/experiences', getExperiences);
route.get('/experiences/:id', getExperienceById);

// Protected routes
route.get('/profile', verifyToken, profileController);
route.post('/logout', verifyToken, logoutController);
route.post('/experiences', verifyToken, createExperience);
route.put('/experiences/:id', verifyToken, updateExperience);
route.delete('/experiences/:id', verifyToken, deleteExperience);

export default route;
