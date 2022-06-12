import { useState, useEffect } from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import {useNavigate} from 'react-router'
// import {toast} from 'react-toastify'
import {FaStore} from 'react-icons/fa'
// import {register, reset} from '../features/auth/authSlice'
import Spinner from '../../../components/Spinner'


function CreateShop() {

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    latLon: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: '',
    pan: '',
    gst: '',
    tradeLicense: ''
  })

  const {email, phone, address, latLon, ownerName, ownerEmail, ownerPhone, ownerAddress, pan, gst, tradeLicense} = formData

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

    if(true) {
      // toast.error('passwords do not match')
      console.log('Error 54')
    } else {
      const userData = {
        email
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
          <FaStore /> Create Store
        </h1>
        <p>create stores and increase your horizon</p>
      </section>

      <section className="formm">
        <form onSubmit={onSubmit}>
          
          <div className="mb-3 formm-group">
            <label htmlFor="email" className="form-label">Shop Email Address</label>
            <input 
              type="email" 
              className="" 
              id="email" 
              name="email" 
              value={email} 
              placeholder="enter shop email address" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="phone" className="form-label">Shop Phone</label>
            <input 
              type="number" 
              className="" 
              id="phone" 
              name="phone" 
              value={phone} 
              placeholder="enter shop phone number" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input 
              type="number" 
              className="" 
              id="address" 
              name="address" 
              value={address} 
              placeholder="enter shop address" 
              onChange={onChange}
            />
          </div>
         
          <div className="mb-3 formm-group">
            <label htmlFor="latLon" className="form-label">GPS Location in Lat-Lon</label>
            <input 
              type="text" 
              className="" 
              id="latLon" 
              name="latLon" 
              value={latLon} 
              placeholder="enter lattitude and longitude separated by comma" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="ownerName" className="form-label">Full Name of Owner</label>
            <input 
              type="text" 
              className="" 
              id="ownerName" 
              name="ownerName" 
              value={ownerName} 
              placeholder="enter full name of owner" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="ownerEmail" className="form-label">Owner's Email Address</label>
            <input 
              type="email" 
              className="" 
              id="ownerEmail" 
              name="ownerEmail" 
              value={ownerEmail} 
              placeholder="enter owner's email address" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="ownerPhone" className="form-label">Owner's Phone</label>
            <input 
              type="number" 
              className="" 
              id="ownerPhone" 
              name="ownerPhone" 
              value={ownerPhone} 
              placeholder="enter owner's phone number" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddress" className="form-label">Owner's Address</label>
            <input 
              type="number" 
              className="" 
              id="ownerAddress" 
              name="ownerAddress" 
              value={ownerAddress} 
              placeholder="enter owner's address" 
              onChange={onChange}
            />
          </div>
         
          <div className="mb-3 formm-group">
            <label htmlFor="pan" className="form-label">Shop PAN-Card Details</label>
            <input 
              type="text" 
              className="" 
              id="pan" 
              name="pan" 
              value={pan} 
              placeholder="shop's pan card details" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="gst" className="form-label">Shop GST Details</label>
            <input 
              type="text" 
              className="" 
              id="gst" 
              name="gst" 
              value={gst} 
              placeholder="shop's GST card details" 
              onChange={onChange}
            />
          </div>

          <div className="mb-3 formm-group">
            <label htmlFor="tradeLicense" className="form-label">Shop Trade-License Details</label>
            <input 
              type="text" 
              className="" 
              id="tradeLicense" 
              name="tradeLicense" 
              value={tradeLicense} 
              placeholder="shop's trade license details" 
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

export default CreateShop