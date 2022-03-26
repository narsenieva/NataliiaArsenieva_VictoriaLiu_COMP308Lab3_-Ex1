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

const AddStudent = () => {
    let firstName, lastName, email, studentNumber, password, address, city, phoneNumber, program;
    const [addStudent, { data, loading, error }] = useMutation(ADD_STUDENT);

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div>
            <form
                onSubmit={e => {    
                    e.preventDefault();
                    addStudent({ variables: { firstName: firstName.value, lastName: lastName.value, 
                    email: email.value, studentNumber: studentNumber.value,
                    password: password.value, address: address.value,
                    city: city.value, phoneNumber: phoneNumber.value,
                    program: program.value
                      } });
                
                    firstName.value = '';
                    lastName.value='';
                    email.value='';
                    studentNumber.value = '';
                    password.value = '';
                    address.value = '';
                    city.value = '';
                    phoneNumber.value = '';
                    program.value = '';
                }}
            >
        <Jumbotron>
        <Form  >
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" class="fields" name="firstName" ref={node => {firstName = node; }} 
                    placeholder="First Name:" />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" class="fields" name="lastName" ref={node => {lastName = node; }} 
                    placeholder="Last Name:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control  type="text" class="fields" name="email" ref={node => {email = node; }} 
                    placeholder="Email:"/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Number</Form.Label>
            <Form.Control type="text" class="fields" name="studentNumber" ref={node => {studentNumber = node; }} 
                    placeholder="Student Number:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control  type="text" class="fields" name="password" ref={node => {password = node; }} 
                    placeholder="Password:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" class="fields" name="address" ref={node => {address = node; }} 
                    placeholder="Address:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control  type="text" class="fields" name="city" ref={node => {city = node; }} 
                    placeholder="City:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control  type="text" class="fields" name="phoneNumber" ref={node => {phoneNumber = node; }} 
                    placeholder="Phone Number:" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control  type="text" class="fields" name="program" ref={node => {program = node; }} 
                    placeholder="Program:" />
          </Form.Group>

           <div class="container">
                    <button type="submit" class="fields">Add Student</button>
            </div>
        </Form>
        </Jumbotron>
        </form>
               
        </div>
    );
}

export default AddStudent
