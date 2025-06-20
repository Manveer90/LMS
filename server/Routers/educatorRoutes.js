import express from 'express'
import { addCourse, educatorDashboardData, getEducatorCourses, getEnrolledStudentsData, updateRoleToEducator } from '../Controllers/EducatorControllrs.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../Middleware/authmiddleware.js'

const educatorRouter = express.Router() 

  // Add Educator Role

  educatorRouter.get('/update-role' , updateRoleToEducator)
  educatorRouter.post('/add-course' , upload.single('image') , protectEducator ,addCourse)
  educatorRouter.get('/courses' , protectEducator , getEducatorCourses)
   educatorRouter.get('/dashboard' , protectEducator , educatorDashboardData)
     educatorRouter.get('/dashboard-students' , protectEducator , getEnrolledStudentsData)
  export default educatorRouter