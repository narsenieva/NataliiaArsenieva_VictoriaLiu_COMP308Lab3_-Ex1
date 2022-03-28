const mongoose = require('mongoose');
const saltRounds = 10;
const Schema = mongoose.Schema;

var CourseSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    courseCode: {
        type: String,
        default: '',
        trim: true,
        required: 'course code cannot be blank'
    },
    courseName: String,
    section: String,
    semester: String,
    
});

module.exports = mongoose.model('Course', CourseSchema);