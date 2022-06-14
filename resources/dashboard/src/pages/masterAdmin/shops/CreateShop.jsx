import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {FaStore} from 'react-icons/fa'
import {createShop, reset} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'


function CreateShop() {

  const [formData, setFormData] = useState({
    email: '',
    phone: '',

    addrLine1: '',
    addrLine2: '',
    addrCity: '',
    addrState: '',
    addrCountry: '',
    addrPostalCode: '',

    latLon: '',

    pan: '',
    gst: '',
    tradeLicense: '',

    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',

    ownerAddrLine1: '',
    ownerAddrLine2: '',
    ownerAddrCity: '',
    ownerAddrState: '',
    ownerAddrCountry: '',
    ownerAddrPostalCode: ''
  })

  const {
    email, 
    phone, 

    addrLine1,
    addrLine2,
    addrCity,
    addrState,
    addrCountry,
    addrPostalCode,

    latLon, 
    
    pan, 
    gst, 
    tradeLicense,

    ownerName, 
    ownerEmail, 
    ownerPhone, 

    ownerAddrLine1,
    ownerAddrLine2,
    ownerAddrCity,
    ownerAddrState,
    ownerAddrCountry,
    ownerAddrPostalCode
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {shops, isLoading, isError, isSuccess, message} = useSelector((state) => state.shops)

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

  // on change
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const shopData = {
      email, 
      phone, 

      addrLine1,
      addrLine2,
      addrCity,
      addrState,
      addrCountry,
      addrPostalCode,

      latLon, 
      
      pan, 
      gst, 
      tradeLicense,

      ownerName, 
      ownerEmail, 
      ownerPhone, 

      ownerAddrLine1,
      ownerAddrLine2,
      ownerAddrCity,
      ownerAddrState,
      ownerAddrCountry,
      ownerAddrPostalCode
    }

    dispatch(createShop(shopData))
    toast.error('form submitted!!!!')
    // if(true) {
    //   toast.error('passwords do not match')
    // } else {
    //   const userData = {
    //     email
    //   }

    //   dispatch(createShop(userData))
    // }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>

      <section className="headingg">
        <h1>
          <FaStore /> Create Shop
        </h1>
        <p>Add new shop to the workforce</p>
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
            <label htmlFor="phone" className="form-label">Shop Phone(10 digits)</label>
            <input 
              type="tel" 
              pattern="[0-9]{11}"
              className="" 
              id="phone" 
              name="phone" 
              value={phone} 
              placeholder="enter shop phone number" 
              onChange={onChange}
            />
          </div>
          <br />

          <h4>Shop Address:</h4>
          <br />
          <div className="mb-3 formm-group">
            <label htmlFor="addrLine1" className="form-label">Address Line 1</label>
            <input 
              type="text" 
              className="" 
              id="addrLine1" 
              name="addrLine1" 
              value={addrLine1} 
              placeholder="shop address line 1" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="addrLine2" className="form-label">Address Line 2</label>
            <input 
              type="text" 
              className="" 
              id="addrLine2" 
              name="addrLine2" 
              value={addrLine2} 
              placeholder="shop address line 2" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="addrCity" className="form-label">Shop's City</label>
            <input 
              type="number" 
              className="" 
              id="addrCity" 
              name="addrCity" 
              value={addrCity} 
              placeholder="enter city the shop is in" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="addrState" className="form-label">State</label>
            <input 
              type="number" 
              className="" 
              id="addrState" 
              name="addrState" 
              value={addrState} 
              placeholder="choose state" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="addrCountry" className="form-label">Country</label>
            <input 
              type="number" 
              className="" 
              id="addrCountry" 
              name="addrCountry" 
              value={addrCountry} 
              placeholder="choose country" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="addrPostalCode" className="form-label">Postal Code</label>
            <input 
              type="text" 
              className="" 
              id="addrPostalCode" 
              name="addrPostalCode" 
              value={addrPostalCode} 
              placeholder="enter postel code" 
              onChange={onChange}
            />
          </div>
          <br />

          <div className="mb-3 formm-group">
            <label htmlFor="latLon" className="form-label">GPS Location in Lat-Lon</label>
            <input 
              type="text" 
              pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
              className="" 
              id="latLon" 
              name="latLon" 
              value={latLon} 
              placeholder="enter lattitude and longitude separated by comma" 
              onChange={onChange}
            />
          </div>
          <br />

          <h4>Shop Documents:</h4>
          <br />
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
          <br />
          <hr />

          <h3>Owner Details</h3>
          <br />

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
            <label htmlFor="ownerPhone" className="form-label">Owner's Phone(10 digits)</label>
            <input 
              type="tel" 
              pattern="[0-9]{11}"
              className="" 
              id="ownerPhone" 
              name="ownerPhone" 
              value={ownerPhone} 
              placeholder="enter owner's phone number" 
              onChange={onChange}
            />
          </div>
          <br />

          <h4>Owner Address Details</h4>
          <br />
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrLine1" className="form-label">Address Line 1</label>
            <input 
              type="text" 
              className="" 
              id="ownerAddrLine1" 
              name="ownerAddrLine1" 
              value={ownerAddrLine1} 
              placeholder=" owner's address line 1" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrLine2" className="form-label">Address Line 2</label>
            <input 
              type="text" 
              className="" 
              id="ownerAddrLine2" 
              name="ownerAddrLine2" 
              value={ownerAddrLine2} 
              placeholder=" owner's address line 2" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrCity" className="form-label">Owner's City</label>
            <input 
              type="number" 
              className="" 
              id="ownerAddrCity" 
              name="ownerAddrCity" 
              value={ownerAddrCity} 
              placeholder="enter city the  owner lives in" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrState" className="form-label">State</label>
            <input 
              type="number" 
              className="" 
              id="ownerAddrState" 
              name="ownerAddrState" 
              value={ownerAddrState} 
              placeholder="choose owner's state" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrCountry" className="form-label">Country</label>
            <input 
              type="number" 
              className="" 
              id="ownerAddrCountry" 
              name="ownerAddrCountry" 
              value={ownerAddrCountry} 
              placeholder="choose owner's country" 
              onChange={onChange}
            />
          </div>
          <div className="mb-3 formm-group">
            <label htmlFor="ownerAddrPostalCode" className="form-label">Owner's Postal Code</label>
            <input 
              type="text" 
              pattern="[0-9]{6}"
              className="" 
              id="ownerAddrPostalCode" 
              name="ownerAddrPostalCode" 
              value={ownerAddrPostalCode} 
              placeholder="enter postel code" 
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