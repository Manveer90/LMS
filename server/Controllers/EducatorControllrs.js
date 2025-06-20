import { clerkClient } from "@clerk/express";
import Course from "../Models/course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "./../Models/purchase.js";

//  Update role to educator

export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = await req.auth();

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add New Course

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const { userId: educatorId } = await req.auth();

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;
    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({ success: true, message: "Course Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get Educator Courses

export const getEducatorCourses = async (req, res) => {
  try {
    const { userId: educatorId } = await req.auth();
    const courses = await Course.find({ educator: educatorId });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  get educaot dashboard data

export const educatorDashboardData = async (req, res) => {
  try {
    const { userId: educatorId } = await req.auth();
    const courses = await Course.find({ educator: educatorId });
    const totalCourses = courses.length;

    const courseId = courses.map((course) => course._id);

    // Calculate total earnings frpom purchase
    const purchases = await Purchase.find({
      courseId: { $in: courseId },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // collect unique student IDs with their course title
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        educatorDashboardData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//  Get Enrolled Students Data with Purchase Data

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const { userId: educatorId } = await req.auth();
    const courses = await Course.find({ educator: educatorId });
    const courseId = courses.map((course) => course._id);

  const purchases = await Purchase.find({
      courseId: { $in: courseId },
      status: "completed",
    }).populate('userId' , 'name imageUrl').populate('courseId' , 'courseTitle')

    const enrolledStudents = purchases.map(purchase => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt
    }))
 
     res.json({success: true , enrolledStudents})

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
