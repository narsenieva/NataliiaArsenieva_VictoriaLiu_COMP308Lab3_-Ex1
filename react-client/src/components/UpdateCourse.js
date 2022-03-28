import React, { Component, useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

//
console.log("very top");

//import './display.css';
//
//const apiUrl = "http://localhost:3000/courses/" + this.props.match.params.id;

// function UpdateCourse(props) {
//   //const apiUrl = "http://localhost:3000/courses/" + props.match.params.id;
//   //console.log(window.location.href);
//   //return window.location.href;
// }

const UPDATE_COURSE = gql`
    mutation UpdateCourse(
        $courseCode: String!,
        $courseName: String!,
        $section: String!,
        $semester: String!
        
        ) {
        updateCourse(
            id: $id,
            courseCode: $courseCode,
            courseName: $courseName,
            section: $section,
            semester: $semester  
            ) {
            _id
        }
    }
`;

const GET_COURSES = gql`
{
    courses{
        _id
        courseCode
        courseName
        section
        semester
    }
}
`;



function UpdateCourse (props){
   
    //let id, courseCode, courseName, section, semester;
    
    console.log("update course top");
    const [coursev, setCourse] = useState({ _id: '', courseCode: '', courseName: '', 
      section: '',semester: ''});  
    const [id, setId] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');
    
    
    const [updateCourse] = useMutation(UPDATE_COURSE);
    const { loading, error, data , refetch } = useQuery(GET_COURSES);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;




    
    //id = updateCourse({variables: {ID: courseNumId._id}});
    
    var url = window.location.href;
    var courseNumId = url.split("/").pop();

    
    
    const getCourse = (e) => {  
      console.log("get course method");
        return data.courses.map(course => {
            if(course._id === e ){
              coursev.id = course._id;
              coursev.courseCode = course.courseCode
              coursev.courseName = course.courseName
              coursev.section = course.section
              coursev.semester= course.semester
             
            }
            
        });
        
    }

    getCourse(courseNumId);
    


    const onChange = (e) => {
      console.log("changing");
      
      setCourse({...coursev, [e.target.name]: e.target.value});
      console.log(e.target.value);
    }

  


    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                   
                    console.log(coursev.firstName.value);
                    updateCourse({ variables: {id: coursev.id.value, courseCode: coursev.courseCode.value, courseName: coursev.courseName.value, 
                      section: coursev.section.value, semester: coursev.semester.value
                        } });
                    // id.value = '';
                    // courseCode.value = '';
                    // courseName.value='';
                    // section.value='';
                    // semester.value = '';
                    
                    
                }}
            >
          


        <Jumbotron>

        <Form  >
          <Form.Group>
            <Form.Label> id</Form.Label>
            <Form.Control type="text" class="fields" name="id" ref={node => {coursev.id = node; }} value={coursev.id} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control type="text" class="fields" name="courseCode" ref={node => {coursev.courseCode = node; }} value={coursev.courseCode} onChange={onChange}  />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control type="text" class="fields" name="courseName" ref={node => {coursev.courseName = node;}} value={coursev.courseName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control  type="text" class="fields" name="section" ref={node => {coursev.section = node; }} value={coursev.section}  onChange={onChange}   />
          </Form.Group>
          <Form.Group>
            <Form.Label> Semester</Form.Label>
            <Form.Control type="text" class="fields" name="semester" ref={node => {coursev.semester = node; }} value={coursev.semester}  onChange={onChange} />
          </Form.Group>
          

           <div class="container">
                    <button type="submit" class="fields">Update Course</button>
            </div>
        </Form>
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default UpdateCourse
