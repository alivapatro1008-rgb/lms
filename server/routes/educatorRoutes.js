import express from 'express'
import { addCourse, getEducatorCourses, updateRoleToEducator, educatorDashboardData, getEnrolledStudentsData } from '../controllers/educatorController.js';
import { requireAuth } from '@clerk/express';
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router()

// Add educator Role
educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator)
educatorRouter.post('/addCourse', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses',  requireAuth(), protectEducator, getEducatorCourses)
educatorRouter.get('/dashboard', requireAuth(), protectEducator, educatorDashboardData)
educatorRouter.get('/enrolled-students', requireAuth(), protectEducator, getEnrolledStudentsData)
export default educatorRouter;