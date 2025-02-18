import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

function ShowStudent(props){
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  const [student, setStudent] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.student);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editStudent = (id) => {
    navigate('/edit/' + id);
   };

   const deleteStudent = (id) => {
    setShowLoading(true);
    const data = { studentNumber: student.studentNumber, password: student.password, firstName: student.firstName, 
        lastName: student.lastName, address: student.address, city: student.city, phoneNumber: student.phoneNumber, 
        email: student.email, program: student.program,  favoriteTopic: student.favoriteTopic, strongestSkill: student.strongestSkill };

  
    axios.delete(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/list')
      }).catch((error) => setShowLoading(false));
  };
  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Name: {student.firstName}, {student.lastName}</h1>
        <p>Email: {student.email}</p>
        <p>Student Number: {student.studentNumber}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(student._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(student._id) }}>Delete</Button>
        </p>
    </div>
  );
}
export default ShowStudent;