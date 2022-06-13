// import {Link} from 'react-router-dom'
import { Outlet } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../logo.jpeg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MasterAdminDashboard() {
  
  const expand = 'md'
  const theme = 'light'

  return (
    <>

      {/* 
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
      </header>
      */}

      <Navbar key={expand} bg={theme} variant={theme} expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#/masterAdmin">
            <img src={logo} alt="DCleans.com" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img src={logo} alt="DCleans.com" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#/">Home</Nav.Link>

                <NavDropdown title="Shops" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                  <NavDropdown.Item href="#/masterAdmin/shops">Shops</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/masterAdmin/shops/1">Shop</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/shops/create">Add Shop</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/shops/edit/1">Edit Shop</NavDropdown.Item>
                </NavDropdown>

                  <NavDropdown title="Accounts" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item href="#/masterAdmin/accounts">Accounts</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#/masterAdmin/accounts/1">Account</NavDropdown.Item>
                    <NavDropdown.Item href="#/masterAdmin/accounts/create">Add Account</NavDropdown.Item>
                    <NavDropdown.Item href="#/masterAdmin/accounts/edit/1">Edit Account</NavDropdown.Item>
                  </NavDropdown>

                <NavDropdown title="Categories" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                  <NavDropdown.Item href="#/masterAdmin/categories">Categories</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/masterAdmin/categories/1">Category</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/categories/create">Add Category</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/categories/edit/1">Edit Category</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown align="end" title="Services" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                  <NavDropdown.Item href="#/masterAdmin/services">Services</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#/masterAdmin/services/1">Service</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/services/create">Add Service</NavDropdown.Item>
                  <NavDropdown.Item href="#/masterAdmin/services/edit/1">Edit Shop Service</NavDropdown.Item>
                </NavDropdown>

              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />

      
      
      <div className="container app-footer-dash">
        <div className="row">
          <div className="col p-2">
            Column
          </div>
          <div className="col p-2">
            This is from: MasterAdminDashboard.js
          </div>
          <div className="col p-2">
            Column
          </div>
        </div>
      </div>

  </>
  )
}

export default MasterAdminDashboard