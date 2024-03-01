// A collection of functions for getting locally stored data

// 
import localData from './user_data/data.json';
const name = localData.name;
const settings = localData.settings;
const courses = localData.courses;


// Returns names of all courses currently being taken by the active usesr
function getCourses() {
    var c = [];
    courses.forEach(course => {
        if (course.currently_taking === true) {
            c.push(course.name);
        }
    });
    return c;
}
                                                                                                     
// Returns current number of completed units for a given course                           
function getCourseProgress(courseName) {                                                                                          
    courses.forEach(course => {
        if (course.name == courseName) {
            return course.completed_Units;
        }
    });
}                                                                     

// Returns the number of completed units for a given chapter
function getChapterProgress(courseName, chapterName) {  
                                                                                                                                            
}          

export {
    getCourses,
    getCourseProgress,
    getChapterProgress,
}