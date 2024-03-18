const course = {
    "name": "Arithmetic",
    "icon": require('../../images/dice_icon.png'),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Risus pretium quam",
    "total_units": 10,
    "chapters": [
        {
            "name": "Basic Symbols",
            "units": 2,
            "path": require('./1/units.js')
        },
        {
            "name": "BODMAS",
            "units": 3,
            "path": require('./2/units.js')
        },
        {
            "name": "Very Cool",
            "units": 4,
            "path": require('./3/units.js')
        },
        {
            "name": "Test chapter",
            "units": 1,
            "path": require('./4/units.js')
        }
    ]
}

export default course;