 
import { useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa' //
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


import logo from '../logo.jpeg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';


function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const {username, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  // use effect function definition
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || auth) {
      // console.log(auth.user.role)
      // navigate('/masterAdmin')

      // User role codes: 
      // 
      // masterAdmin:1
      // shopAdmin:2
      // frontDesk:3
      // transporter:4
      // worker:5
      // homeService:6
      if (auth.user.role == '1') {
        navigate('/masterAdmin')
      } else if (auth.user.role === '2') {
        navigate('/shopAdmin')
      } else if (auth.user.role === '3') {
        navigate('/frontDesk')
      } else if (auth.user.role === '4') {
        navigate('/transporter')
      } else if (auth.user.role === '5') {
        navigate('/worker')
      } else if (auth.user.role === '6') {
        navigate('/homeService')
      }
    }

    dispatch(reset())

  }, [auth, isSuccess, isError, message, navigate, dispatch])

  // on change function definition
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))  // we want this to be an object , so paranthesis here
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(formData);

    const userData = {
      username,
      password
    }

    dispatch(login(userData))
  }

  const expand = 'md'
  const theme = 'light'

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>

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
                
                <NavDropdown align="end" title="Shops" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                  <NavDropdown.Item href="#/masterAdmin">Master</NavDropdown.Item>
                  <NavDropdown.Item href="#/shopAdmin">Shop Admin</NavDropdown.Item>
                  <NavDropdown.Item href="#/frontDesk">Front Desk</NavDropdown.Item>
                  <NavDropdown.Item href="#/transporter">Transporter</NavDropdown.Item>
                  <NavDropdown.Item href="#/worker">Worker</NavDropdown.Item>
                  <NavDropdown.Item href="#/homeService">Home Service</NavDropdown.Item>
                </NavDropdown>
               
              </Nav>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>


      <section className="headingg">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please enter your credentials</p>
      </section>

      <section className="formm">
        <form onSubmit={onSubmit}>

          <div className="mb-3 formm-group">
            <label htmlFor="role" className="form-label">Username</label>
            <input 
              type="text" 
              className="" 
              id="username" 
              name="username" 
              value={username} 
              placeholder="enter your username" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="password" className="form-label">Choose a Password</label>
            <input 
              type="password" 
              className="" 
              id="password" 
              name="password" 
              value={password} 
              placeholder="choose a password" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <button type="submit" className='btnn btnn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login