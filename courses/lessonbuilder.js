// const fs = require('fs');

// const lessonbuilder = ()=> {
//     const directory = './courses/lessons'
//     const adventures = [];
//     fs.readdir(directory, (err, topics) => {
//         // Iterate over the files in the directory
//         topics.forEach(topic => {
//             // Print the filename
//             topic_dict = {"name": topic , "screen": "ModuleLearningScreen" , "modules": []}
//             console.log(topic);
//             const moduledirectory = './courses/lessons/'+topic
//             fs.readdir(moduledirectory, (err, currentmodules) => {
//                 currentmodules.forEach(currentmodule => {
//                     console.log(currentmodule)
//                     const moduleData = JSON.parse(currentmodule);
//                     topic_dict.modules.push({
//                         name: moduleData.name,
//                         module_data: moduleData
//                     });
//                 })
                
//             })
//         });
//     });
// }

// lessonbuilder()

const Problem_Solving = require('./lessons/Problem Solving/Problem Solving');
const It_Tech = require('./lessons/It-Tech/It Tech')
const Interpersonal = require('./lessons/Interpersonal Skills/Interpersonal Skills')

const adventures = [
    {"name":"Problem Solving" ,"screen":"ModuleLearningScreen", "img":null , "modules": [Problem_Solving] } , 
    {"name":"It Tech" ,"screen":"ModuleLearningScreen", "img":null , "modules": [It_Tech] } , 
    {"name":"Interpersonal Skills" ,"screen":"ModuleLearningScreen", "img":null , "modules": [Interpersonal] } , 
]

export default adventures;