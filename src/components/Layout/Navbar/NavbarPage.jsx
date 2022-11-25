import React from 'react'
import {Navbar,Nav,Container } from 'react-bootstrap';
import './NavbarPage.css';
import {FaUser} from 'react-icons/fa';

const NavbarPage = () => {
  return (
    <> 
    <Navbar bg="light" variant="light"  className='shadow p-3 mb-5 bg-body rounded'>
    <Container fluid>
      <Navbar.Brand>
        <img src="./images/logo2.gif" className='imgcss'/>
      </Navbar.Brand>
      <Nav className="me-auto">
            <Nav.Link href="/"><h4>Home</h4></Nav.Link>
          </Nav>

      <Navbar.Brand>
       <FaUser size={"30px"}/>
      </Navbar.Brand>   
      
    </Container>
  </Navbar>
  </>
  )
}

export default NavbarPage