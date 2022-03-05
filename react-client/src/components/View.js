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
  const [course, setCourse] = useState('');

  //const firstName = screen.getParam('firstName');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  // const listCourses = (data) => {
  //   console.log('in lisCourses: ',data)
  //   //setCourse('n')

  // }

  const listCourses = async() => {
    console.log('in list Courses: ')
    setCourse('l')
    
  }

  // const listCourses = async () => {
  //   try {
  //     const res = await axios.get('/');
  //     console.log(res.data)
  //     //setData(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  

  // const listCourses = (studentNumber) => {
  //   props.history.push({
  //     pathname: '/listcourse/' + studentNumber
  //   });
  // };

  //
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('c')

  }
  //
  return (
    <div className="App">
      <p>Your Student Number: {screen}</p>
      <p>{data}</p>
      {/* <button onClick={verifyCookie}>Verify Cookie</button>      */}
      <button onClick={deleteCookie}>Log out</button>
      {course !== 'c' 
        ? <div>
            {/* <p>{screen}</p>
            <p>{data}</p> */}
            
            <button onClick={createCourse}>Create Course</button>    
          </div>            
        : 
          <CreateCourse screen={screen} setScreen={setScreen} />
      }

      {course == 'l'
        ? <ListCourses screen={screen} setScreen={setScreen} /> :
        <div>
            {/* <p>{screen}</p>
            <p>{data}</p> */}
            <button onClick={listCourses}>List Courses</button>
          </div>            
      }

      {/* {course !== 'y'
        ? <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses}>List Courses</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <CreateCourse screen={screen} setScreen={setScreen} />
        
      } */}
      {/* {course !== 'a'
        ? <div>
            <p>{screen}</p>
            <p>{data}</p>
            <button onClick={verifyCookie}>Verify Cookie</button>
            <button onClick={createCourse}>Create Course</button>
            <button onClick={listCourses}>List Courses</button>

            <button onClick={deleteCookie}>Log out</button>
          </div>            
        : <ListCourses screen={screen} setScreen={setScreen} />
        
      } */}
      
    </div>
  );
}

//
export default View;