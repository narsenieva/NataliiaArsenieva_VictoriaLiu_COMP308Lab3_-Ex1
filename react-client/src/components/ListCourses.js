import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function ListCourses(props) {
  //console.log('props.match.params',props.match.params.id)
  const studentNumber = props.screen;
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/api/courses" ;
  const apiUrlStudent = "http://localhost:3000/students";
  let resultDataScreenStudent ;
  //console.log(studentNumber)
  //console.log("testing")
  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrlStudent)
      .then(result => {
        resultDataScreenStudent = result.data.screen
        console.log(result.data.screen)
      }).catch((error) => {
        console.log('error in fetchData:', error)
      });
      axios.get(apiUrl)
        .then(result => {
          //console.log('result.data:',result.data)
          //check if the user has logged in
          if(resultDataScreenStudent !== 'auth')
          {
            
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showcourse/' + id
    });
  }

  return (
    <div>
      
      { data.length !== 0
        ? <div>
          <h2> List of Courses </h2>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.courseCode}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListCourses);
