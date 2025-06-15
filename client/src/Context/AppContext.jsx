/* eslint-disable react-refresh/only-export-components */

import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducaor, setIsEducaor] = useState([]);
  const [enrolledcourses, setEnrolledcourses] = useState([]);
  // fatch all courses

  const FetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // for calculating the ratings
  const calculateratings = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalratings = 0;
    course.courseRatings.forEach((rating) => (totalratings += rating.rating));
    return totalratings / course.courseRatings.length;
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

  const calculateNoofLectures = (course) => {
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
    setEnrolledcourses(dummyCourses);
  };

  useEffect(() => {
    FetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateratings,
    isEducaor,
    setIsEducaor,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    enrolledcourses,
    fetchUserEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
