import UpdateStudent from './UpdateStudent';
import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";


const GET_STUDENTS = gql`
{
    students{
        _id
      firstName
      lastName
      email
      studentNumber
      address  
      city
      program  
    }
}
`;

const DELETE_STUDENT = gql`
mutation DeleteStudent(
    $ID: String!,
    ) {
        deleteStudent(
            id: $ID
            ) {
            _id
        }
    }
`;
//
const StudentList = (props) => {
    
    const { screen, setScreen } = props;
    const { loading, error, data , refetch } = useQuery(GET_STUDENTS);
    const [deletestudent] = useMutation(DELETE_STUDENT);
    const editUser = (id) => {
        props.history.push({
          pathname: '/edit/' + id
        });
      };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    //const [deleteStudent] = useMutation(DELETE_STUDENT);
    return (
        <div>
            <table >
                <tr>
                    <th>_id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>email</th>
                    <th>studentNumber</th>
                    <th>address</th>
                    <th>city</th>
                    <th>program</th>
                </tr>
                {data.students.map((student, index) => (
                    <tr key={index}>
                        <td>{student._id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.email}</td>
                        <td>{student.studentNumber}</td>
                        <td>{student.address}</td>
                        <td>{student.city}</td>
                        <td>{student.program}</td>
                        <td>
                            <button onClick={() => { 
                                deletestudent({variables: {ID: student._id}})
                                refetch()
                                }}>Delete</button>
                        </td>
                        
                        <td>
                            <button onClick={() => { 
                                editUser(student._id)
                                }}>edit</button>
                        </td>


                    </tr>
                ))}
            </table>
            <div class="center">
                <button class = "center" onClick={() => refetch()}>Refetch</button>
            </div>
        </div>
    );
}

export default StudentList

