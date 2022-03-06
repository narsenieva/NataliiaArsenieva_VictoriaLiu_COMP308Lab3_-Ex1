import CreateCourse from './CreateCourse';
import ListCourses from './ListCourses';
import React, { useState } from 'react';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //

  //
  return (
    <div className="App">
      <h1>Your Student Number: {screen}</h1>
      <h1>{data}</h1>
     
      <h2>Welcome, please use the nav bar to navigate.</h2>
      <h4>Created by:</h4>
      <h5>Nataliia Arsenieva (301043237) and Victoria Liu (301028404)</h5>
      <h5>COMP308 Lab02 Ex1</h5>
    </div>
  );
}

//
export default View;