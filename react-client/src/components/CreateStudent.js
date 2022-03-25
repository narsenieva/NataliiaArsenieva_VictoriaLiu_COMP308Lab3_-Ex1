import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
                email: '',studentNumber: '',password: '', address: '', city: '', phoneNumber: '', program: ''});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [program, setProgram] = useState('');

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  let validatedStudentNumber = false;
  let validatedPassword = false;
  let validatedEmail = false;
  let validatedPhone = false;
  let validatedInput = false;

  const ADD_STUDENT = gql`
  mutation AddStudent(
      $firstName: String!,
      $lastName: String!,
      $email: String!,
      $studentNumber: String!,
      $password: String!,
      $address: String!,
      $city: String!,
      $phoneNumber: String!,
      $program: String!
      ) {
      addStudent(
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          studentNumber: $studentNumber,
          password: $password,
          address: $address,
          city: $city,
          phoneNumber: $phoneNumber,
          program: $program 
          ) {
          _id
      }
  }
`;


  const handleInputStudentNumber = (e) => {
    let value = e
    const re = /^[0-9\b]+$/;
    if (re.test(value)) {
      setStudentNumber(value);
      validatedStudentNumber = true;
    }
    else{
      window.alert('Student Number: Please use numbers only.');
      validatedStudentNumber = false;
    }

  }

  const handleInputPassword = (e) => {
    let value = e
    if(e.length > 6)
    {
      setPassword(value);
      validatedPassword = true;
    }
    else{
      window.alert('Please make password 7+ characters long.');
      validatedPassword = false;
    }
  }

  const handleInputEmail = (e) => {
    let value = e
    const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if (re.test(value) ){ 
      setEmail(value);
      validatedEmail = true;
    }
    else{
      window.alert('Please enter a valid email.');
      validatedEmail = false;
    }

  }

  
  const handleInputPhoneNumber = (e) => {
    let value = e
    const re = /^[0-9\b]+$/;
    if (re.test(value)) {
      setPhoneNumber(value);
      validatedPhone = true;
    }
    else{
      window.alert('Phone Number: Please use numbers only.');
      validatedPhone = false;
    }

  }

  const handleInputValidation = ()=> {
    if(firstName !== '' && lastName !== '' && email !== '' && studentNumber !== '' && password !== ''  && address !== '' 
    && city !== '' && phoneNumber !== ''&& program !== '') {
        handleInputStudentNumber(studentNumber);
        handleInputPassword(password)
        handleInputEmail(email);
        handleInputPhoneNumber(phoneNumber);
        if(validatedStudentNumber && validatedPassword && validatedEmail && validatedPhone) {
            validatedInput = true;
        }
    } else {
        validatedInput = false;
    }
  }

  const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT);
  const handleAddStudent = async (event) =>{ 
    event.preventDefault();
    validatedInput = false;
    handleInputValidation();

    if(validatedInput){
      setShowLoading(true);
      

      const data = { firstName, lastName, email, studentNumber, password,
        address, city, phoneNumber, program };
      addStudent({ variables: { firstName: firstName.value, lastName: lastName.value, 
        email: email.value, studentNumber: studentNumber.value,
        password: password.value, address: address.value,
        city: city.value, phoneNumber: phoneNumber.value,
        program: program.value
          } });
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
        props.history.push('/show/' + result.data._id) 
      }).catch((error) => setShowLoading(false));


    } 
    else {
      window.alert('Please fill out all the fields!');
    }
    
    
};


  

  const onChange = (e) => {
    //handleList(e)
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value}); 
  }


  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={handleAddStudent} >
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

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);