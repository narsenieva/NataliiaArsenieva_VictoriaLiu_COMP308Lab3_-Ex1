const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');

//
function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};
//
exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    //course.takenBy = req.body.username;
    console.log(req.body)
    //
    //
    Student.findOne({studentNumber: req.body.studentNumber}, (err, student) => {

        if (err) { return getErrorMessage(err); }
        //
        req.id = student._id;
        console.log('student._id',req.id);

	
    }).then( function () 
    {
        course.takenBy = req.id
        console.log('req.student._id',req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
// exports.list = function (req, res, next, id) {
//     Student.findOne({username: req.body.username}, (err, student) => {

//         if (err) { return getErrorMessage(err); }
//         //
//         req.id = student._id;
//         console.log('student._id',req.id);
	
//     }).then( function () 
//     {
        
//         Course.findById(id).populate('takenBy', 'firstName lastName fullName').exec((err, course) => {
//             if (err) return next(err);
//             if (!course) return next(new Error('Failed to load course '+ id));
//                 req.course = course;
//                 console.log('in courseById:', req.course)
//                 next();
//             });
//     });

// };

// exports.list = function (req, res) {
//     Course.find().sort('-created').populate('takenBy', 'firstName lastName fullName').exec((err, courses) => {
//         if (err) {
//             return res.status(400).send({
//                 message: getErrorMessage(err)
//             });
//         } else {
//             //res.status(200).json(courses);
//             if (req.course.takenBy.id == req.id) {
//                 res.status(200).json(courses);
//                 console.log(courses.takenBy.id)
//             }
//         }
//     });
// };


// exports.list = function (req, res, next, id) {
//     console.log("username")
//     Course.findById(id).populate('takenBy', 'firstName lastName fullName').exec((err, course) => {if (err) return next(err);
//         console.log("herererereererere")
//         if (!course) return next(new Error('Failed to load course ' + id));
//         req.course = course;
//         console.log('in courseById:', req.course)
//         next();
//     });
// };

exports.list = function (req, res) {
    Course.find().sort('-created').populate('takenBy', 'firstName lastName fullName').exec((err, courses) => {
    if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};

//
exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('takenBy', 'firstName lastName fullName').exec((err, course) => {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '
            + id));
        req.course = course;
        console.log('in courseById:', req.course)
        next();
    });
};
//
exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//The hasAuthorization() middleware uses the req.course and req.student objects
//to verify that the current student is the takenBy of the current course
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - takenBy: ',req.course.takenBy)
    console.log('in hasAuthorization - student: ',req.id)
    //console.log('in hasAuthorization - student: ',req.student._id)


    if (req.course.takenBy.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
