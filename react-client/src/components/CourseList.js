//import UpdateCourse from './UpdateCourse';
import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import { useHistory } from 'react-router-dom'

const GET_COURSES = gql`
{
    courses{
        _id
      courseCode
      courseName
      section
      semester
    }
}
`;

const DELETE_COURSE = gql`
mutation DeleteCourse(
    $ID: String!,
    ) {
        deleteCourse(
            id: $ID
            ) {
            _id
        }
    }
`;
//
const CourseList = (props) => {
    
    const { screen, setScreen } = props;
    const { loading, error, data , refetch } = useQuery(GET_COURSES);
    const [deletecourse] = useMutation(DELETE_COURSE);
    const { push } = useHistory();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    //const [deleteCourse] = useMutation(DELETE_COURSE);
    return (
        <div>
            <table >
                <tr>
                    <th>_id</th>
                    <th>CourseCode</th>
                    <th>CourseName</th>
                    <th>Section</th>
                    <th>Semester</th>
                    
                </tr>
                {data.courses.map((course, index) => (
                    <tr key={index}>
                        <td>{course._id}</td>
                        <td>{course.courseCode}</td>
                        <td>{course.courseName}</td>
                        <td>{course.section}</td>
                        <td>{course.semester}</td>
                       
                        <td>
                            <button onClick={() => { 
                                deletecourse({variables: {ID: course._id}})
                                refetch()
                                }}>Delete</button>
                        </td>
                        
                        <td>
                            <button onClick={() => { 
                                push('/editcourse/'+course._id)
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

export default CourseList

