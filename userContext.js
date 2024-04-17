import React from 'react';

export const UserContext = React.createContext({
    username : "Jabbamjc",
    
    profile_picture : "put a link to bucket here",

    progress : {},
    updateProgress: () => {},

    last_lesson : {
      course : "Problem Solving",
      quiz : "Addition 1"
    },
    updateLastLesson: () => {},
    
    current_courses : [
      "Arithmetic",
      "Literacy",
      "Digital",
      "Interview Skills",
    ],
    updateCurrentCourses: () => {},

    daily_streak : 1,
    updateDailyStreak: () => {},
    
});
export default UserContext