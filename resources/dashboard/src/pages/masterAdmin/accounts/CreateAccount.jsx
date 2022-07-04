import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {getRoles, gotRoles, createUser, reset} from '../../../features/users/userSlice'
import Spinner from '../../../components/Spinner'

function CreateAccount() {
  console.log("CREATE-ACCOUNT: Entered")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const {auth} = useSelector((state) => state.auth)
  const {roles, isLoadingRoles, isErrorRoles, messageRoles, rolesApiCallCount,  isLoading, isError, isSuccess, message} = useSelector((state) => state.users)

  // Form prefill datas
  const [formPrefill, setFormPrefill] = useState({
    roles: []
  })

  // Form value fields
  const [formData, setFormData] = useState({
    role: '0',  // role preset to 0
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  })

  const {
    role, 
    name, 
    username, 
    email, 
    phone, 
    password, 
    password_confirmation
  } = formData

  // on change (what is it???)
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password_confirmation) {
      toast.error('passwords do not match')
    } else {
      const userData = {
        role, 
        name, 
        username, 
        email, 
        phone, 
        password, 
        password_confirmation
      }

      dispatch(createUser(userData))
      toast.success('form submitted!!!!')
    }
  }


  // use effect function call
  useEffect(() => {

    // if roles are empty in redux store we need them loaded first
    if ( roles.length === 0 && rolesApiCallCount === 0) {  // roles reset is never called, thats why: infinite loop not formed at reset
      console.log('ROLES API CALL')
      dispatch(getRoles())
      dispatch(gotRoles())
    } 

    if(roles.length > 0 && formPrefill.roles.length === 0) {
      setFormPrefill((previousState) => ({
        ...previousState, 
        'roles': roles,
      }))
    }

    if(isErrorRoles) {
      console.log(messageRoles);
    }
    if(isError) {
      toast.error(message);
    }

    /* if(!auth) {
      toast.error('Create-Account access is unauthorized')
    } */

    if(isSuccess) {
      navigate('/masterAdmin/accounts')
    }

    dispatch(reset())    // THIS MAY BE DANGEROUS, NEED TO KNOW WHY IT IS REQUIRED AND WHAT IT IS EXACTLY DOING

  }, [isError, isSuccess, message, navigate, dispatch, roles, isErrorRoles, messageRoles, rolesApiCallCount, formPrefill])


  if(isLoading || isLoadingRoles) {
    return <Spinner />
  }

  return (
    <>
      <section className="headingg">
        <h1>
          <FaUser /> Account Creation
        </h1>
        <p>Create account for available roles</p>
      </section>

      <section className="formm">
        <form onSubmit={onSubmit}>
          
          <div className="mb-3 formm-group">
            <label htmlFor="role" className="form-label">Role</label>
            <select 
              type="number" 
              className="form-select" 
              id="role" 
              name="role" 
              value={role} 
              onChange={onChange}
              aria-label="User Roles"
            >
              <option key={0} value={0}>Select a Role</option>
              {formPrefill.roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
         
          <div className="mb-3 formm-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              className="" 
              id="name" 
              name="name" 
              value={name} 
              placeholder="enter name" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="username" className="form-label">Username</label>
            <input 
              type="text" 
              className="" 
              id="username" 
              name="username" 
              value={username} 
              placeholder="pick an username" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              type="email" 
              className="" 
              id="email" 
              name="email" 
              value={email} 
              placeholder="enter email address" 
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">We'll never share email with anyone else.</div>
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="phone" className="form-label">Phone(example: +91 9999999999)</label>
            <input 
              type="tel" 
              pattern="((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}"
              className="" 
              id="phone" 
              name="phone" 
              value={phone} 
              placeholder="enter phone number" 
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">We'll never share phone with anyone else.</div>
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
            <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="" 
              id="password_confirmation" 
              name="password_confirmation" 
              value={password_confirmation} 
              placeholder="confirm password" 
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

