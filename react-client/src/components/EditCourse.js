import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditCourse(props) {
  console.log('edituser props:',props.match.params)
  //const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section: '', semester: '' });  
  
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [section, setSection] = useState('');
  const [semester, setSemester] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  
  const apiUrl = "http://localhost:3000/api/courses/" + props.match.params.id;
  
  let validatedSection = false;
  let validatedInput = false;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      //setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
      setCourseCode(result.data.courseCode);
      setCourseName(result.data.courseName);
      setSection(result.data.section);
      setSemester(result.data.semester);
    };

    fetchData();
  }, []);

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

  const handleUpdateCourse = async (e) =>{ 
    e.preventDefault();
    validatedInput = false;
    handleInputValidation();

    if(validatedInput){
      setShowLoading(true);
      const data = {courseCode, courseName, section, semester};

      axios.put(apiUrl, data).then((result) => {
        window.alert(`Course updated successfully`)
        setCourseCode('');
        setCourseName('');
        setSection('');
        setSemester('');
        setShowLoading(false);
        console.log('after calling put to update',result.data )
        props.history.push('/showcourse/' + result.data._id)
      }).catch((error) => setShowLoading(false));
    } 
    else {
      window.alert('Please fill out all the fields!');
    }
};    

  

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={handleUpdateCourse}>
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
                  Update Course
                </Button>
              </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditCourse);