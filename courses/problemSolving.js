const course = {
    "name": "Problem Solving",
    "icon": require('../images/maths_symbols_icon_green.svg'),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Risus pretium quam",
    
    "total_units": 10,

    "Difficulties" : ["Beginner", "Intermediate", "Advanced"],
    
    "quizzes" : {
        "Beginner": [
          {
            "name": "Addition 1",
            "icon":"default",
            "format":"multiple_choice",
            "time":15,
            "number_of_questions":null,
            "type":"question_time", //not sure
            "answer_count":7, //num of questions
            "questions":[{"question":"What is 27 + 49?","answer_count":4,"long_form":false,"answers":["54","66","76","84"],"correct_index":2},{"question":"What is 134 + 65?","answer_count":4,"long_form":false,"answers":["184","186","197","199"],"correct_index":3},{"question":"What is 73 + 19?","answer_count":4,"long_form":false,"answers":["92","94","96","98"],"correct_index":0},{"question":"What is 39 + 9?","answer_count":4,"long_form":false,"answers":["44","45","46","48"],"correct_index":3},{"question":"What is 123 + 123?","answer_count":4,"long_form":false,"answers":["213","222","231","246"],"correct_index":3},{"question":"What is 69 + 69?","answer_count":4,"long_form":false,"answers":["100","133","138","169"],"correct_index":2},{"question":"What is 189 + 11?","answer_count":4,"long_form":false,"answers":["198","199","200","201"],"correct_index":2}]
          },
          {
            "name": "Addition 2",
            "icon":"default",
            "format":"multiple_choice",
            "time":15,
            "number_of_questions":null,
            "type":"question_time",
            "answer_count":10,
            "questions":[{"question":"What is 456 + 654?","answer_count":4,"long_form":false,"answers":["1,000","1,050","1,110","1,164"],"correct_index":2},{"question":"What is 322 + 322?","answer_count":4,"long_form":false,"answers":["644","654","664","674"],"correct_index":0},{"question":"What is 1,000 + 472?","answer_count":4,"long_form":false,"answers":["1,470","1,471","1,472","1,473"],"correct_index":2},{"question":"What is 887 + 396?","answer_count":4,"long_form":false,"answers":["1,054","1,123","1,195","1,283"],"correct_index":3},{"question":"What is 4,534 + 604?","answer_count":4,"long_form":false,"answers":["4,894","5,138","5,554","5,921"],"correct_index":1},{"question":"What is 9,998 + 9,999?","answer_count":4,"long_form":false,"answers":["19,997","19,998","19,999","20,000"],"correct_index":0},{"question":"What is 56,765 + 89?","answer_count":4,"long_form":false,"answers":["56,805","56,832","56,845","56,854"],"correct_index":3},{"question":"What is 11,456 + 11,043?","answer_count":4,"long_form":false,"answers":["22,456","22,499","22,506","22,534"],"correct_index":1},{"question":"What is 73,665 + 25,444?","answer_count":4,"long_form":false,"answers":["99,109","99,119","99,129","99,139"],"correct_index":0},{"question":"What is 106,543 + 12,455?","answer_count":4,"long_form":false,"answers":["117,562","118,998","119,734","120,223"],"correct_index":1}],
          },
        ],
        "Intermediate": [
          {
            "name": "BODMAS 1",
            "icon":"default",
            "format":"multiple_choice",
            "time":15,
            "number_of_questions":null,
            "type":"question_time",
            "answer_count":10,
            "questions":[{"question":"What is ( 5 + 18) + 5?","answer_count":4,"long_form":false,"answers":["20","24","28","32"],"correct_index":2},{"question":"What is (22 - 4) + (22 + 4)?","answer_count":4,"long_form":false,"answers":["44","46","48","50"],"correct_index":0},{"question":"What is 3^2 + 1?","answer_count":4,"long_form":false,"answers":["9","10","32","33"],"correct_index":1},{"question":"What is 4 x 3 - 2?","answer_count":4,"long_form":false,"answers":["4","8","10","12"],"correct_index":2},{"question":"What is 5 ÷ 5 + 10?","answer_count":4,"long_form":false,"answers":["0.33","10","11","15"],"correct_index":2},{"question":"What is (3^2 x 2) + 1?","answer_count":4,"long_form":false,"answers":["18","19","20","21"],"correct_index":1},{"question":"What is (15 ÷ 3) - (6 ÷ 2)?","answer_count":4,"long_form":false,"answers":["2","3","5","25"],"correct_index":0},{"question":"What is 4^2 + 3^2?","answer_count":4,"long_form":false,"answers":["16","21","25","29"],"correct_index":2},{"question":"What is 3 - 2 + 3 + 4^2?","answer_count":4,"long_form":false,"answers":["20","22","24","26"],"correct_index":0},{"question":"What is (3 x 6) x (2^2 - 1)?","answer_count":4,"long_form":false,"answers":["40","44","50","54"],"correct_index":3}],
          },
                  ],
        "Advanced": [
          {
            "name": "Factorisation 1",
            "icon":"default",
            "format":"multiple_choice",
            "time":15,
            "number_of_questions":null,
            "type":"question_time",
            "answer_count":15,
            "questions":[{"question":"What is (x + 3)(x + 3)?","answer_count":4,"long_form":false,"answers":["x^2 + 4x + 6","x^2 + 4x + 8","x^2 + 6x + 7","x^2 + 6x + 9"],"correct_index":3},{"question":"What is (x + 1)(x + 5)?","answer_count":4,"long_form":false,"answers":["x^2 + 1x + 5","x^2 + 2x + 5","x^2 + 6x + 5","x^2 + 6x + 6"],"correct_index":2},{"question":"What is (x + 3)(x + 4)?","answer_count":4,"long_form":false,"answers":["x^2 + 3x + 10","x^2 + 7x + 12","x^2 + 4x + 20","x^2 + 7x + 18"],"correct_index":1},{"question":"What is (x + 1)(x + 1)?","answer_count":4,"long_form":false,"answers":["x^2 + x + 1","x^2 + 2x + 1","x^2 + 2x + 2","x^2 + 1x + 11"],"correct_index":1},{"question":"What is Factorise 3x + 12?","answer_count":4,"long_form":false,"answers":["2(2x + 6)","1(3x + 6)","3(x + 4)","4(2x + 2)"],"correct_index":3},{"question":"What is Factorise 2x + 4?","answer_count":4,"long_form":false,"answers":["1(2x + 4)","2(x + 2)","2x(1 + 2)","3x(1 + 1)"],"correct_index":1},{"question":"What is Factorise 5x + 15x?","answer_count":4,"long_form":false,"answers":["3(2x + 3)","4(4x + 4)","5(x + 3x)","5x(1 + 3)"],"correct_index":3},{"question":"What is Factorise 8x + 24x?","answer_count":4,"long_form":false,"answers":["3x(3 + 8)","5x(2x + 4)","8x(1 + 3)","10x(1 + 2)"],"correct_index":2},{"question":"What is Factorise x^2 + 4x + 4?","answer_count":4,"long_form":false,"answers":["(x + 2) (x + 2)","(x + 1) (x + 2)","(x + 1) (x + 1)","(x + 4) (x + 4)"],"correct_index":0},{"question":"What is Factorise x^2 + 7x + 12?","answer_count":4,"long_form":false,"answers":["(x + 3) (x + 2)","(x + 4) (x + 2)","(x + 3) (x + 4)","(x + 5) (x + 5)"],"correct_index":2},{"question":"What is Factorise x^2 + 9x + 20x?","answer_count":4,"long_form":false,"answers":["(x + 3) (x + 3)","(x + 4) (x + 4)","(x + 4) (x + 5)","(x + 6) (x + 6)"],"correct_index":2},{"question":"What is Factorise x^2 + 12x + 36?","answer_count":4,"long_form":false,"answers":["(x + 6) (x + 6)","(x + 7) (x + 7)","(x + 6) (x + 8)","(x + 8) (x + 8)"],"correct_index":0},{"question":"What is (x - 1) ( x + 3)?","answer_count":4,"long_form":false,"answers":["x^2 + 2x + 3","x^2 + 2x - 3","x^2 + 4x - 3","x^2 + 4x + 3"],"correct_index":1},{"question":"What is Factorise 20x^2 + 10x?","answer_count":4,"long_form":false,"answers":["10x ( 2x + 1x)","10x ( 2x - 1)","10 ( 2x^2 + x)","10x ( 2x + 1)"],"correct_index":3},{"question":"What is Factorise x^2 + 3x -10?","answer_count":4,"long_form":false,"answers":["(x + 2) + (x + 3)","(x - 2) (x + 3)","(x + 5) (x - 2)","(x + 2) (x + 5)"],"correct_index":2}],
          },
        ]
      }
    
}

export default course;