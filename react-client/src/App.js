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
import List from './components/List';
import EditStudent from './components/EditStudent';

import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';

import CreateCourse from './components/CreateCourse';
import EditCourse from './components/EditCourse';
import ShowCourse from './components/ShowCourse';
import ListCourses from './components/ListCourses';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import UpdateCourse from './components/UpdateCourse';
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
            <Nav.Link href="/create">Sign Up</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/list">List of Students</Nav.Link>
            <Nav.Link href="/studentlist">Student List</Nav.Link>
            <Nav.Link href="/addstudent">Add Student</Nav.Link>
            <Nav.Link href="/addcourse">Add Course</Nav.Link>
            <Nav.Link href="/courselist">Course List</Nav.Link>
            <Nav.Link href="/listcourses">Course List</Nav.Link>
            <Nav.Link href="/signout" onClick={deleteCookie}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < List />} path="/list" />
          <Route render ={()=> < EditStudent />} path="/edit/:id" />
          <Route render ={()=> < StudentList />} path="/studentlist" />
          <Route render ={()=> < AddStudent />} path="/addstudent" />
          <Route render ={()=> < UpdateStudent />} path="/updatestudent/:id" />

          <Route render ={()=> < CourseList />} path="/courselist" />
          <Route render ={()=> < AddCourse />} path="/addcourse" />
          <Route render ={()=> < UpdateCourse />} path="/updatecourse/:id" />

          <Route render ={()=> < CreateStudent />} path="/create" />
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
          <Route render ={()=> < ListCourses />} path="/listcourses" />
          <Route render ={()=> < ShowCourse />} path="/showcourse/:id" />
          <Route render ={()=> < EditCourse />} path="/editcourse/:id" />
          <Route render ={()=> < CreateCourse />} path="/course" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
