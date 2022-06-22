import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {toast} from 'react-toastify'
import {FaStore} from 'react-icons/fa'
import {createShop, reset} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'
import Address from '../../../components/addrComponents/Address'


function CreateShop() {

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: {},
    // address: {
    //   line1: '',
    //   line2: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   postalCode: '',
    // },
    latLon: '',
    pan: '',
    gst: '',
    tradeLicense: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: {},
    // ownerAddress: {
    //   line1: '',
    //   line2: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   postalCode: '',
    // },
  })

  const {
    email, 
    phone, 
    address, //
    latLon, 
    pan, 
    gst, 
    tradeLicense,
    ownerName, 
    ownerEmail, 
    ownerPhone, 
    ownerAddress, //
  } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  // const {shops, isLoading, isError, isSuccess, message} = useSelector((state) => state.shops)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.shops)

  // use effect function call
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(!auth) {
      // navigate('/')
      toast.error('Create-Shop access is Unauthorized')
    }

    if(isSuccess) {
      navigate('/masterAdmin/shops')
    }

    dispatch(reset())

  }, [auth, isError, isSuccess, message, navigate, dispatch])


  const setAddrData = (inAddress) => {
    console.log(inAddress)
    setFormData((previousState) => ({
      ...previousState, 
      [address]: inAddress,
    }))
    console.log(address)
  }
  const setOwnerAddrData = (inAddress) => {
    console.log(inAddress)
    setFormData((previousState) => ({
      ...previousState, 
      [ownerAddress]: inAddress,
    }))
    console.log(ownerAddress)
  }


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

      address, //
      // addrLine1,
      // addrLine2,
      // addrCity,
      // addrState,
      // addrCountry,
      // addrPostalCode,
      latLon, 
      
      pan, 
      gst, 
      tradeLicense,

      ownerName, 
      ownerEmail, 
      ownerPhone, 
      ownerAddress, //
      // ownerAddrLine1,
      // ownerAddrLine2,
      // ownerAddrCity,
      // ownerAddrState,
      // ownerAddrCountry,
      // ownerAddrPostalCode
    }

    console.log(shopData)
    // dispatch(createShop(shopData))
    // toast.success('form submitted!!!!')
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
        <p>Add a new shop to the workforce</p>
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
            <label htmlFor="phone" className="form-label">Shop Phone(example: +91 9999999999)</label>
            <input 
              type="tel" 
              pattern="((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}"  // or [0-9]{10}
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
          <Address setAddrData={setAddrData} />
          {/* <div className="mb-3 formm-group">
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
          </div> */}
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
            <label htmlFor="ownerPhone" className="form-label">Owner's Phone(example: +91 9999999999)</label>
            <input 
              type="tel" 
              pattern="((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}"  // [0-9]{10}
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
          <Address  setAddrData={setOwnerAddrData}/>
          {/* <div className="mb-3 formm-group">
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
          </div> */}
          
          <div className="mb-3 formm-group">
            <button type="submit" className="btnn btnn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateShop