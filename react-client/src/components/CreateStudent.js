import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
                email: '',studentNumber: '',password: '', address: '', city: '', phoneNumber: '', program: '', listOfYourCourses: '' });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [program, setProgram] = useState('');
  const [listOfYourCourses, setListOfCourses] = useState('');
  const coursesForAdding = {}

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]



  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";


  const handleAddStudent = async (event) =>{
    setShowLoading(true);
    event.preventDefault();
    const data = { firstName, lastName, email, studentNumber, password,
    address, city, phoneNumber, program, listOfYourCourses };
    
      axios.post(apiUrl, data).then((result) => {
        window.alert(`Student inserted successfully`)
        setShowLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setAddress('');
        setCity('');
        setPhoneNumber('');
        setProgram('');
        setListOfCourses('');
        props.history.push('/show/' + result.data._id) 
      }).catch((error) => setShowLoading(false));
    
};

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: student.firstName, lastName: student.lastName, email: student.email,studentNumber: student.studentNumber, password: student.password,
      address: student.address, city: student.city, phoneNumber: student.phoneNumber, program: student.program, listOfYourCourses: student.listOfYourCourses };
    if (student.password.length > 6) 
    {
      axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        console.log('results from student:',result.data)
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));

    }
    else{
      window.alert('Password must be greater than 6 characters')
    }
  };


  const onChange = (e) => {
    //handleList(e)
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }


  const handleList =  (e) => {
    console.log(e)
    setListOfCourses(Array.isArray(e) ? e.map(x => x.value) : []);

    // var options = e.target.options
    // for(var i =0;i<options.length ;i++){
    //   if(options[i].selected ){
    //     console.log(options[i].value)
    //     coursesForAdding.push(options[i].value)
    //   }
    // }
    // setListOfCourses(coursesForAdding)
  }


  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={handleAddStudent}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" 
                          value={firstName} onChange={e => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name"
                          value={lastName} onChange={e => setLastName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email"
                          value={email} onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter student number"
                          value={studentNumber} onChange={e => setStudentNumber(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" 
                          value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address"
                          value={address} onChange={e => setAddress(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter city" 
                          value={city} onChange={e => setCity(e.target.value)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" 
                          value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" 
                          value={program} onChange={e => setProgram(e.target.value)}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Add Courses</Form.Label>
              <Select isMulti name="listOfYourCourses" id="listOfYourCourses"  options={options} 
                      onChange={handleList}>
              </Select>
          </Form.Group>


          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);