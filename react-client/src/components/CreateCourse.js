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
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    const apiUrlStudent = "http://localhost:3000/students";
    //

    let validatedSection = false;
    let validatedInput = false;

    const handleInputSection = (e) => {
      let value = e
      const re = /^[0-9\b]+$/;
      if (re.test(value)) {
        setSection(value);
        validatedSection = true;
      }
      else{
        window.alert('Section: Please use numbers only.');
        validatedSection = false;
      }
    }

    const handleInputValidation = ()=> {
      if(courseCode !== '' && courseName !== '' && section !== '' && semester !== '') {
        handleInputSection(section);
          if(validatedSection) {
              validatedInput = true;
          }
      } else {
          validatedInput = false;
      }
    }

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


    const handleAddCourse = async (e) =>{ 
      e.preventDefault();
      validatedInput = false;
      handleInputValidation();
  
      if(validatedInput){
        setShowLoading(true);
        const data = {courseCode, courseName, section, semester,studentNumber};
  
        axios.post(apiUrl, data).then((result) => {
          window.alert(`Course inserted successfully`)
          setCourseCode('');
          setCourseName('');
          setSection('');
          setSemester('');
          setShowLoading(false);
          console.log('results from save course:',result.data)
          props.history.push('/showcourse/' + result.data._id)
        }).catch((error) => setShowLoading(false));
      } 
      else {
        window.alert('Please fill out all the fields!');
      }
  };    
    return (
      <div>
        {
          data.length !==0 ? 
          <div>
          <h2> Add Course: {studentNumber} </h2>
          {showLoading && 
              <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
              </Spinner> 
          } 
            <Jumbotron>
              <Form onSubmit={handleAddCourse}>
                <Form.Group>
                  <Form.Label> Course Code</Form.Label>
                  <Form.Control type="text" name="courseCode" id="courseCode" placeholder="Enter course code" 
                                value={courseCode} onChange={e => setCourseCode(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Course Name</Form.Label>
                  <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter course name"
                                value={courseName} onChange={e => setCourseName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Section </Form.Label>
                  <Form.Control type="text" name="section" id="section" placeholder="Enter section"
                                value={section} onChange={e => setSection(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Semester </Form.Label>
                  <Form.Control type="text" name="semester" id="semester" placeholder="Enter semester"
                                value={semester} onChange={e => setSemester(e.target.value)} />
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