
import React, { useState } from 'react';
import AddCourse from './AddCourse';
//
import axios from 'axios';
//
function View (props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [course, setCourse] = useState('');

 


  //
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('c')

  }
  //
  return (
    <div className="App">
      
      
      <h1>Your Student Number: {screen}</h1>
      <h1>{data}</h1>

      <h2>Welcome, please use the nav bar to navigate.</h2>
      <h2>Start by adding a course</h2>
      {course !== 'c' 
        ? <div>
            {/* <p>{screen}</p>
            <p>{data}</p> */}
            
            <button onClick={createCourse}>Add Course</button>    
          </div>            
        : 
          <AddCourse screen={screen} setScreen={setScreen} />
      }


      <h4>Created by:</h4>
      <h5>Nataliia Arsenieva (301043237) and Victoria Liu (301028404)</h5>
      <h5>COMP308 Lab03 Ex1</h5>




      
      
      
    </div>
  );
}

//
export default View;