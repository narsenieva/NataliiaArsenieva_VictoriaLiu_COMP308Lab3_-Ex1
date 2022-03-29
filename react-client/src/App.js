import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//

import EditStudent from './components/EditStudent';

import ShowStudent from './components/ShowStudent';

import EditCourse from './components/EditCourse';
import ShowCourse from './components/ShowCourse';

import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';

import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';

import Home from './components/Home';
import Login from './components/Login';
//
import axios from 'axios';



function App() {

  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
    } catch (e) {
      console.log(e);
    }
  };



  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
           
            <Nav.Link href="/addstudent">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
           
            <Nav.Link href="/studentlist">Student List</Nav.Link>
            <Nav.Link href="/addcourse">Add Course</Nav.Link>
            <Nav.Link href="/courselist">Course List</Nav.Link>
        
            <Nav.Link href="/signout" onClick={deleteCookie}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
         
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < StudentList />} path="/studentlist" />
          <Route render ={()=> < AddStudent />} path="/addstudent" />
         

          <Route render ={()=> < CourseList />} path="/courselist" />
          <Route render ={()=> < AddCourse />} path="/addcourse" />
        

         
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
         
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />
      

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
