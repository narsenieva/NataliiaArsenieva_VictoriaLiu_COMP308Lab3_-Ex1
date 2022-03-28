import React, { Component } from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
//

//import './display.css';
//
const ADD_COURSE = gql`
    mutation AddCourse(
        $courseCode: String!,
        $courseName: String!,
        $section: String!,
        $semester: String!
        ) {
        addCourse(
            courseCode: $courseCode,
            courseName: $courseName,
            section: $section,
            semester: $semester       
            ) {
            _id
        }
    }
`;

const AddCourse = () => {
    let courseCode, courseName, section, semester;
    const [addCourse, { data, loading, error }] = useMutation(ADD_COURSE);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addCourse({ variables: { courseCode: courseCode.value, courseName: courseName.value, 
                    section: section.value, semester: semester.value
                      } });
                
                    courseCode.value = '';
                    courseName.value='';
                    section.value='';
                    semester.value = '';
                    
                }}
            >
        <Jumbotron>
        <Form  >
          <Form.Group>
            <Form.Label> Course Code</Form.Label>
            <Form.Control type="text" class="fields" name="courseCode" ref={node => {courseCode = node; }} 
                    placeholder="Course Code:" />
          </Form.Group>
          <Form.Group>
            <Form.Label> Course Name</Form.Label>
            <Form.Control type="text" class="fields" name="CourseName" ref={node => {courseName = node; }} 
                    placeholder="Course Name:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control  type="text" class="fields" name="section" ref={node => {section = node; }} 
                    placeholder="Section:"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Semester </Form.Label>
            <Form.Control type="text" class="fields" name="semester" ref={node => {semester = node; }} 
                    placeholder="Semester:" />
          </Form.Group>
        

           <div class="container">
                    <button type="submit" class="fields">Add Course</button>
            </div>
        </Form>
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default AddCourse
