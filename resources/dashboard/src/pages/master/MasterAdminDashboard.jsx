import {Link} from 'react-router-dom'
import { Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

function MasterAdminDashboard() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#/master">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>


      <header className='header'>
        <li>
          <Link to='/master/shops'>
            Shops
          </Link>
        </li>
        <li>
          <Link to='/master/shops/1'>
            Shop-1
          </Link>
        </li>
        <li>
          <Link to='/master/shops/create'>
            create Shop
          </Link>
        </li>
        <li>
          <Link to='/master/shops/edit/1'>
            edit shop-1
          </Link>
        </li>

        
        <li>
          <Link to='/master/categories'>
            category
          </Link>
        </li>
        <li>
          <Link to='/master/categories/1'>
            category-1
          </Link>
        </li>
        <li>
          <Link to='/master/categories/create'>
            create category
          </Link>
        </li>
        <li>
          <Link to='/master/categories/edit/1'>
            edit category-1
          </Link>
        </li>

        
        <li>
          <Link to='/master/services'>
            Services
          </Link>
        </li>
        <li>
          <Link to='/master/services/1'>
            Service-1
          </Link>
        </li>
        <li>
          <Link to='/master/services/create'>
            create Service
          </Link>
        </li>
        <li>
          <Link to='/master/services/edit/1'>
            edit Service-1
          </Link>
        </li>
      </header>
      
      <Outlet />

      <h3>This is from MasterAdminHome.js(Should be Footer ..)</h3>
  </>
  )
}

export default MasterAdminDashboard