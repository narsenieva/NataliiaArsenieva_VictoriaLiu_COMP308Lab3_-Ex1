import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Login from './Login';
//
function CreateCourse(props) {
    //
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [data, setData] = useState([]);
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '', studentNumber: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    const apiUrlStudent = "http://localhost:3000/students";
    //

    useEffect(() => {
      const fetchData = async () => {
        axios.get(apiUrlStudent)
          .then(result => {
            console.log('result.data:',result.data)
            //check if the user has logged in
            if(result.data.screen !== 'auth')
            {     
              console.log('data in if:', result.data )
              setData(result.data);
              setShowLoading(false);
            }
          }).catch((error) => {
            console.log('error in fetchData:', error)
          });
        };  
      fetchData();
    }, []);

    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester: course.semester, studentNumber: studentNumber };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push('/showcourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }
    
    return (
      <div>
        {
          data.length !==0 ? 
          
          <div>
          <h2> Create an course {studentNumber} </h2>
          {showLoading && 
              <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
              </Spinner> 
          } 
            <Jumbotron>
              <Form onSubmit={saveCourse}>
                <Form.Group>
                  <Form.Label> Course Code</Form.Label>
                  <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" value={course.courseCode} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Course Name</Form.Label>
                  <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name" value={course.courseName} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Section </Form.Label>
                  <Form.Control type="text" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Semester </Form.Label>
                  <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Save Course
                </Button>
              </Form>
            </Jumbotron>
          </div>
          
          : < Login />

        }
        
        </div>
    );


}

export default withRouter(CreateCourse);
