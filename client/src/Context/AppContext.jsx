/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
// import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth , useUser} from "@clerk/clerk-react"
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  
  const {getToken} = useAuth()
  const {user} = useUser()

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);

  // fatch all courses

  const FetchAllCourses = async () => {
   try {
     const {data} = await axios.get(backendUrl + '/api/course/all')

     if (data.success) {
      setAllCourses(data.courses)
     }else{
      toast.error(data.message)
     }

   } catch (error) {
     toast.error(error.message)
   }
  };
  // Fetch UserData
 const FetchUserdata = async () => {

  if (user.publicMetadata.role === 'educator') {
    setIsEducator(true)
  }

   try {
    const token = await getToken()
     
     const {data} = await axios.get(backendUrl + '/api/user/data' , {headers: {Authorization: `Bearer ${token}`}})

      if (data.success) {
      setUserData(data.user)
     }else{
      toast.error(data.message)
     }

    } catch (error) {
     toast.error(error.message)
   }
  };

  // for calculating the ratings
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalratings = 0;
    course.courseRatings.forEach((rating) => (totalratings += rating.rating));
    return Math.floor(totalratings / course.courseRatings.length);
  };

  // for caculate course chapter TIME

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // for caculate course chapter TIME

  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // for caculate No of lectures in a course

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // Fetch user enrolled courses
  const fetchUserEnrolledCourses = async () => {
    try {
      const token = await getToken()
      const {data} = await axios.get(backendUrl + '/api/user/enrolled-courses' , {headers: {Authorization: `Bearer ${token}`}})

       if (data.success) {
      setEnrolledCourses(data.enrolledCourses.reverse())
     }else{
      toast.error(data.message)
     }

    } catch (error) {
     toast.error(error.message)
   }
  };
  

  useEffect(() => {
    FetchAllCourses();

  }, []);

  
  useEffect(()=>{
     if(user){
           FetchUserdata()
           fetchUserEnrolledCourses()
     }
  } , [user])

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,backendUrl , userData , setUserData , getToken , FetchAllCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
