var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;
const Student = require('mongoose').model('Student');

// authenticates a student
exports.authenticate = function(req, res, next) {
	// Get credentials from request
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;
	
	//find the user with given username using static method findOne
	Student.findOne({studentNumber: studentNumber}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student)
			//compare passwords	
			
			if(password === student.password) {
				// Create a new token with the user id in the payload
  				// and which expires 300 seconds after issue
				const token = jwt.sign({ id: student._id, studentNumber: student.studentNumber }, jwtKey, 
					{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
				console.log('token:', token)
				// set the cookie as the token string, with a similar max age as the token
				// here, the max age is in milliseconds
				res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
				res.status(200).send({ screen: student.studentNumber });
				//
				//res.json({status:"success", message: "user found!!!", data:{user:
				//user, token:token}});
				
				req.student=student;
				//call the next middleware
				next()
			} else {
				res.json({status:"error", message: "Invalid student number/password!!!",
				data:null});
			}
		}
		
	 });
	
};


// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the user, along with their
	// username given in the token
	// use back-quotes here
	res.send(`${payload.studentNumber}`)
 };

 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the user back to the main application page
	//res.redirect('/');
}
//check if the user is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).send({ screen: payload.studentNumber });
}

//isAuthenticated() method to check whether a user is currently authenticated
exports.requiresLogin = function (req, res, next) {
  // Obtain the session token from the requests cookies,
// which come with every request
const token = req.cookies.token
console.log(token)
// if the cookie is not set, return an unauthorized error
if (!token) {
  return res.send({ screen: 'auth' }).end();
}
var payload;
try {
  // Parse the JWT string and store the result in `payload`.
  // Note that we are passing the key in this method as well. This method will throw an error
  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
  // or if the signature does not match
  payload = jwt.verify(token, jwtKey)
  console.log('in requiresLogin - payload:',payload)
  req.id = payload.id;
} catch (e) {
  if (e instanceof jwt.JsonWebTokenError) {
  // if the error thrown is because the JWT is unauthorized, return a 401 error
  return res.status(401).end()
  }
  // otherwise, return a bad request error
  return res.status(400).end()
}
// user is authenticated
//call next function in line
  next();
};


// Returns all students
exports.list = function (req, res, next) {
  // Use the 'Student' instance's 'find' method to retrieve a new student document
  Student.find({}, function (err, students) {
      if (err) {
          return next(err);
      } else {
          res.json(students);
      }
  });
};
//
//'read' controller method to display a student
exports.read = function(req, res) {
// Use the 'response' object to send a JSON response
res.json(req.student);
};
//
// 'studentByID' controller method to find a student by its id
exports.studentByID = function (req, res, next, id) {
// Use the 'User' static 'findOne' method to retrieve a specific student
Student.findOne({
      _id: id
}, (err, student) => {
  if (err) {
    // Call the next middleware with an error message
    return next(err);
  } else {
    // Set the 'req.user' property
          req.student = student;
          console.log(student);
    // Call the next middleware
    next();
  }
});
};

const studentType = new GraphQLObjectType({
    name: 'student',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        studentNumber: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        address: {
          type: GraphQLString
        },
        city: {
          type: GraphQLString
        },
        phoneNumber: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        program: {
          type: GraphQLString
        }
      }
    }
  });
  //
  // create a GraphQL query type that returns all students or a student by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        students: {
          type: new GraphQLList(studentType),
          resolve: function () {
            const students = StudentModel.find().exec()
            if (!students) {
              throw new Error('Error')
            }
            return students
          }
        },
        student: {
          type: studentType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const studentInfo = StudentModel.findById(params.id).exec()
            if (!studentInfo) {
              throw new Error('Error')
            }
            return studentInfo
          }
        }
      }
    }
  });
  //
  // add mutations for CRUD operations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addStudent: {
          type: studentType,
          args: {
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            studentNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: new GraphQLNonNull(GraphQLString)
            },
            city: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phoneNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            program: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const studentModel = new StudentModel(params);
            const newStudent = studentModel.save();
            if (!newStudent) {
              throw new Error('Error');
            }
            return newStudent
          }
        },
        updateStudent: {
          type: studentType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            studentNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            address: {
              type: new GraphQLNonNull(GraphQLString)
            },
            city: {
              type: new GraphQLNonNull(GraphQLString)
            },
            phoneNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            program: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return StudentModel.findByIdAndUpdate(params.id, { firstName: params.firstName, 
              lastName: params.lastName, email: params.email, studentNumber: params.studentNumber,
              password: params.password, address: params.address, city: params.city,
              phoneNumber: params.phoneNumber, program: params.program
               }, function (err) {
              if (err) return next(err);
            });
          }
        },
        deleteStudent: {
          type: studentType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const deletedStudent = StudentModel.findByIdAndRemove(params.id).exec();
            if (!deletedStudent) {
              throw new Error('Error')
            }
            return deletedStudent;
          }
        }
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  