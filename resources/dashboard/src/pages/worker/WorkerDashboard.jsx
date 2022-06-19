
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {logout, reset} from '../../features/auth/authSlice'
// import Spinner from '../../components/Spinner'

import { Outlet } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';

import logo from '../../logo.jpeg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function WorkerDashboard() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth, isError, message} = useSelector((state) => state.auth)

  // use effect function call
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(!auth || auth.user.role !== '5') {
      navigate('/')
    }

    dispatch(reset())

  }, [auth, isError, message, navigate, dispatch])

  const logUserOut = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  // if(isLoading) {
  //   return <Spinner />
  // }

  const expand = 'md'
  const theme = 'light'

  return (
    <>

      <Navbar key={expand} bg={theme} variant={theme} expand={expand} className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#/worker">
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
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown
                  title="Dropdown"
                  id={`offcanvasNavbarDropdown-expand-${expand}`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
      
      <div className="container app-footer-dash">
        <div className="row">
          <div className="col p-2">
            <Button variant="outline-primary" onClick={logUserOut}>Logout</Button>{' '}
          </div>
          <div className="col p-2">
            This is from: TransporterDashboard.js
          </div>
          <div className="col p-2">
            Column
          </div>
        </div>
      </div>
      
    </>
  )
}

export default WorkerDashboard