import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { Button, Container,Row,Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import './Todo.css';
import NavbarPage from '../Layout/Navbar/NavbarPage';

const Todo = () => {

  const [usertodo,setUsertodo]=useState([]);

  const location = useLocation()
  const userId = location.state && location.state.id

  const navigate = useNavigate();

  useEffect(() => {
  
    if(!userId){
      navigate('/');
    }
    
    axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then((res)=>
      setUsertodo(res.data)
    )

  }, [])


  //console.log(usertodo);
  
  return (
    <>
     <NavbarPage />
      <Container className='paddingcss'>
      <div className='buttoncss'>
      <Button onClick={()=>navigate('/')}>Back</Button>
      </div>
        <Row className='paddingcss'>
        <Table className='shadow p-3 mb-5 bg-body rounded' striped bordered hover responsive>
       <thead>
        <tr  className='text-center tablehead'>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {usertodo && usertodo.map((data)=>
          <tr key={data.id}>
            <td className='text-center'>{data.id}</td>
            <td>{data.title}</td>
            <td className='text-center'> 
            <Form.Check 
            className='checkbox-xl'
            type='checkbox'
            disabled
            checked = {data.completed}
            id='default-checkbox'
          /></td>
          </tr>
        )}
      
      </tbody>
    </Table>   
        </Row>
      </Container>

    </>
  )
}

export default Todo