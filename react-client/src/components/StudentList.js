import React from 'react';
import {gql, useQuery} from "@apollo/client";


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
//
const StudentList = () => {
    const { loading, error, data , refetch } = useQuery(GET_STUDENTS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

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

