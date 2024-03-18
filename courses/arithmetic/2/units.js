import images from '../../../images/Index';

const units = [
    {
        "name": "Unit 1",
        "quizzes": [
            {"name": "Addition 1", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Addition 2", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Subtraction 1", "image": images.icons.minus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Multiply 1", "image": images.icons.multiply_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Multiply 2", "image": images.icons.multiply_icon, "questions": [require('./quizzes/u1q1.json')]},
        ]
    },
    {
        "name": "Unit 2",
        "quizzes": [
            {"name": "Addition 3", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Addition 4", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Subtraction 2", "image": images.icons.minus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Multiply 3", "image": images.icons.multiply_icon, "questions": [require('./quizzes/u1q1.json')]},
        ]
    },
    {
        "name": "Unit 3",
        "quizzes": [
            {"name": "Addition 1", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Addition 2", "image": images.icons.plus_icon, "questions": [require('./quizzes/u1q1.json')]},
            {"name": "Subtraction 1", "image": images.icons.minus_icon, "questions": [require('./quizzes/u1q1.json')]},
        ]
    }
]

export default units;