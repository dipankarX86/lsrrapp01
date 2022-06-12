import { useState, useEffect } from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {useNavigate} from 'react-router'
// import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
// import {register, reset} from '../features/auth/authSlice'
import Spinner from '../../../components/Spinner'


function CreateAccount() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  // const navigate = useNavigate()
  // const dispatch = useDispatch()

  // const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  // // use effect function call
  // useEffect(() => {
  //   if(isError) {
  //     toast.error(message)
  //   }

  //   if(isSuccess || user) {
  //     navigate('/dashboard')
  //   }

  //   dispatch(reset())

  // }, [user, isError, isSuccess, message, navigate, dispatch])

  // on change (what is it???)
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      // toast.error('passwords do not match')
      console.log('Error 54')
    } else {
      const userData = {
        name, email, password
      }

      // dispatch(register(userData))
    }
  }

  // if(isLoading) {
  //   return <Spinner />
  // }

  return (
    <>

      <section className="headingg">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      {/* <section className="form">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </section> */}

      <section className="formm">
        <form onSubmit={onSubmit}>
          <div className="mb-3 formm-group">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input 
              type="text" 
              className="" 
              id="name" 
              name="name" 
              value={name} 
              placeholder="enter your name" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="email" className="form-label">Your Email Address</label>
            <input 
              type="email" 
              className="" 
              id="email" 
              name="email" 
              value={email} 
              placeholder="enter your email address" 
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
            <label htmlFor="password2" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="" 
              id="password2" 
              name="password2" 
              value={password2} 
              placeholder="confirm your password" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <button type="submit" className="btnn btnn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateAccount