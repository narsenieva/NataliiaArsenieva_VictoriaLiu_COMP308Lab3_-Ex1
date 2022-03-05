import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditStudent(props) {
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
  const [listOfYourCourses, setListOfCourses] = useState('');
  
  let coursesForAdding = []

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      //setListOfCourses(result.data.data.listOfYourCourses);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
      //const student = await api.getStudentById(id)
      //setStudentNumber(student.data.data.studentNumber);
      //setPassword(student.data.data.password);
      //setFirstName(student.data.data.firstName);
      //setLastName(student.data.data.lastName);
      //setAddress(student.data.data.address);
      //setCity(student.data.data.city);
      //setPhoneNumber(student.data.data.phoneNumber);
      //setEmail(student.data.data.email);
      //setProgram(student.data.data.program);
      
      //setListOfCourses(student.data.data.listOfYourCourses);
      console.log("hererereere NICE " + result.data.listOfYourCourses)
     
     // setCourse(student.data.data.course);
      const test = Object.values(result.data.listOfYourCourses)
      console.log(test)
      handleSelectDefault(test)
      console.log(coursesForAdding)
      //console.log(test.length)
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: student.firstName, lastName: student.lastName, email: student.email,studentNumber: student.studentNumber, 
      address: student.address, city: student.city, phoneNumber: student.phoneNumber, program: student.program, listOfYourCourses: student.listOfYourCourses};
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when student enters a field
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }


  const handleUpdateStudent = async (event) =>{
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


  const handleSelectDefault = (e) => {

    console.log("handleeeeeeeeeeeeeeeee")
    //console.log("eeeeeeeeeee" )
    //let temp = []
  
    //console.log(e.count)
    console.log((listOfYourCourses))
    console.log(typeof(e))
    for(var i = 0; i < e.length; i++){
      for(var j = 0; j < options.length; j++){
        //console.log("hereeeeeeeeee " + e[i].value)
        console.log(e[i] + " f "+ options[j].value)
        if(e[i] == options[j].value){
          coursesForAdding.push(options[j])
          console.log(e[i])
        }
      }
    }
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
        <Form onSubmit={updateStudent}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
            </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Name</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter student number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter address " value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phoneNumber" value={student.phoneNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Add Courses</Form.Label>
              <Select isMulti name="listOfYourCourses" id="listOfYourCourses" defaultValue={coursesForAdding} options={options} 
                      onChange={handleList}>
              </Select>
          </Form.Group>
          


          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditStudent);
