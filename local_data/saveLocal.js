// A collection of functions for saving data to local data storage
import localData from './user_data/data.json';
const name = localData.name;
const settings = localData.settings;
const courses = localData.courses;


function updateCurrentCourses(newCourses) {
    // Check if new courses are valid / already have save data
    // If they already have save data, set CurrentCourses = true,
    // Otherwise create a new course entry in the courses array
    // Set all values to default
    // Save back to local data
    // if so, then change current courses
}   

function increaseCourseProgress(course, increase) {

}

function increaseUnitProgess(course, chapter, unitIndex, newUnitValue) {

}

function setQuestionProgress(course, chapter, unitIndex, questionIndex, newQuestionValue) {

}