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
    latLon: '',
    pan: '',
    gst: '',
    tradeLicense: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerAddress: {},
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
      toast.error('Create-Shop access is Unauthorized')
    }

    if(isSuccess) {
      navigate('/masterAdmin/shops')
    }

    dispatch(reset())

  }, [auth, isError, isSuccess, message, navigate, dispatch])


  // on change
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }


  // 
  const [ownerAddrIsSameAsShop, setOwnerAddrIsSameAsShop] = useState(false);
  //
  // copy shop address details to owner address details
  const copyShopAddrToOwner = () => {
    setOwnerAddrIsSameAsShop(true)
  }

  // set address datas from child to current state
  const setAddrData = (inAddress, initialCallback) => {
    setFormData((previousState) => ({
      ...previousState, 
      'address': inAddress,
    }))
    if(!initialCallback) {
      setOwnerAddrIsSameAsShop(false)
    }
  }
  const setOwnerAddrData = (inAddress, initialCallback) => {
    setFormData((previousState) => ({
      ...previousState, 
      'ownerAddress': inAddress,
    }))
    if(!initialCallback) {
      setOwnerAddrIsSameAsShop(false)
    }
  }
  // 


  // Final submission of the form to the server
  const onSubmit = (e) => {
    e.preventDefault()

    const shopData = {
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
    }

    // console.log(shopData)
    dispatch(createShop(shopData))
    toast.success('form submitted!!!!')
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
          <Address setAddrDataToShop={setAddrData} fillData={address} />
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
          { ownerAddrIsSameAsShop ? 
            <Address setAddrDataToShop={setOwnerAddrData} fillData={address} /> 
            : <>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={copyShopAddrToOwner}>Same as Shop Address</button>
              <br />
              <br />
              <Address setAddrDataToShop={setOwnerAddrData} fillData={ownerAddress} />
            </> }
          
          <div className="mb-3 formm-group">
            <button type="submit" className="btnn btnn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateShop