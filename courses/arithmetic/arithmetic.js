const course = {
    "name": "Arithmetic",
    "icon": require('../../images/dice_icon.png'),
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Risus pretium quam",
    "total_units": 14,
    "chapters": [
        {
            "name": "Basic Symbols",
            "units": 3,
            "path": require('./1/units.js')
        },
        {
            "name": "BODMAS",
            "units": 5,
            "path": require('./2/units.js')
        },
        {
            "name": "Very Cool",
            "units": 6,
            "path": "arithmetic/3/units.json"
        }
    ]
}

export default course;