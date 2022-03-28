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
//const apiUrl = "http://localhost:3000/students/" + this.props.match.params.id;

// function UpdateStudent(props) {
//   //const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
//   //console.log(window.location.href);
//   //return window.location.href;
// }

const UPDATE_STUDENT = gql`
    mutation UpdateStudent(
        $id: String!,
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
        updateStudent(
            id: $id,
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

const GET_STUDENTS = gql`
{
    students{
        _id
      firstName
      lastName
      email
      studentNumber
      password
      address  
      city
      phoneNumber
      program  
    }
}
`;



function UpdateStudent (props){
   
    //let id, firstName, lastName, email, studentNumber, password, address, city, phoneNumber, program;
    //let firstNameCopy, lastNameCopy, emailCopy, studentNumberCopy, passwordCopy, addressCopy, cityCopy, phoneNumberCopy, programCopy;
    console.log("update student top");
    const [studentv, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
      email: '',studentNumber: '',password: '', address: '', city: '', phoneNumber: '', program: ''});  
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [program, setProgram] = useState('');
    
    // this.state = {value: ''};
    
    const [updateStudent] = useMutation(UPDATE_STUDENT);
    const { loading, error, data , refetch } = useQuery(GET_STUDENTS);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;




    
    //id = updateStudent({variables: {ID: studentNumId._id}});
    
    var url = window.location.href;
    var studentNumId = url.split("/").pop();

    
    
    const getStudent = (e) => {  
      console.log("get student method");
        return data.students.map(student => {
            if(student._id === e ){
              studentv.id = student._id;
              studentv.firstName = student.firstName
              studentv.lastName = student.lastName
              studentv.email = student.email
              studentv.studentNumber= student.studentNumber
              studentv.password = student.password
              studentv.address =  student.address
              studentv.city =  student.city
              studentv.phoneNumber = student.phoneNumber
              studentv.program =  student.program
            }
            
        });
        
    }

    getStudent(studentNumId);
    //console.log(firstName);
    //console.log(firstNameCopy);


    const onChange = (e) => {
      console.log("changing");
      
      setStudent({...studentv, [e.target.name]: e.target.value});
      console.log(e.target.value);
    }

  


    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    //console.log(firstName.value);
                    //emptyfields();
                    //console.log("after "+firstNameCopy);
                    // updateStudent({ variables: {id: id.value, firstName: firstName.value, lastName: lastName.value, 
                    // email: email.value, studentNumber: studentNumber.value,
                    // password: password.value, address: address.value,
                    // city: city.value, phoneNumber: phoneNumber.value,
                    // program: program.value
                    //   } });
                    console.log(studentv.firstName.value);
                    updateStudent({ variables: {id: studentv.id.value, firstName: studentv.firstName.value, lastName: studentv.lastName.value, 
                      email: studentv.email.value, studentNumber: studentv.studentNumber.value,
                      password: studentv.password.value, address: studentv.address.value,
                      city: studentv.city.value, phoneNumber: studentv.phoneNumber.value,
                      program: studentv.program.value
                        } });
                    // id.value = '';
                    // firstName.value = '';
                    // lastName.value='';
                    // email.value='';
                    // studentNumber.value = '';
                    // password.value = '';
                    // address.value = '';
                    // city.value = '';
                    // phoneNumber.value = '';
                    // program.value = '';
                    
                }}
            >
          


        <Jumbotron>

        <Form  >
          <Form.Group>
            <Form.Label> id</Form.Label>
            <Form.Control type="text" class="fields" name="id" ref={node => {studentv.id = node; }} value={studentv.id} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" class="fields" name="firstName" ref={node => {studentv.firstName = node; }} value={studentv.firstName} onChange={e => setFirstName(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" class="fields" name="lastName" ref={node => {studentv.lastName = node;}} value={studentv.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control  type="text" class="fields" name="email" ref={node => {studentv.email = node; }} value={studentv.email}  onChange={onChange}   />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" class="fields" name="studentNumber" ref={node => {studentv.studentNumber = node; }} value={studentv.studentNumber}  onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control  type="text" class="fields" name="password" ref={node => {studentv.password = node; }} value={studentv.password}  onChange={onChange}  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" class="fields" name="address" ref={node => {studentv.address = node; }} value={studentv.address} onChange={onChange}     />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control  type="text" class="fields" name="city" ref={node => {studentv.city = node; }} value={studentv.city}  onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control  type="text" class="fields" name="phoneNumber" ref={node => {studentv.phoneNumber = node; }} value={studentv.phoneNumber}    onChange={onChange}   />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control  type="text" class="fields" name="program" ref={node => {studentv.program = node; }} value={studentv.program}  onChange={onChange} /> 
          </Form.Group>

           <div class="container">
                    <button type="submit" class="fields">Update Student</button>
            </div>
        </Form>
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default UpdateStudent
