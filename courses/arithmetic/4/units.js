import images from '../../../images/Index';

const units = [
    {
        "name": "Test Unit",
        "quizzes": [
            {"name": "Addition 1", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Addition 2", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q2.json')]},
            {"name": "Subtraction 1", "image": images.icons.minus_icon, "questions": [require('./quizzes/testLessonQuiz.json')]},
            {"name": "Multiply 1", "image": images.icons.multiply_icon, "questions": [require('./quizzes/testLesson.json')]},
            {"name": "Multiply 2", "image": images.icons.multiply_icon, "questions": [require('./quizzes/u1q1.json')]},
        ]
    }
]

export default units;