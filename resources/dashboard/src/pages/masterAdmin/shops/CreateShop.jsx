import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import { useParams, useLocation } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaStore} from 'react-icons/fa'
import {createShop, reset, getShop, gotShop, resetExceptShop} from '../../../features/shops/shopSlice'
// import {createShop, reset, getShop, gotShop, resetExceptShop, toggleAddressRender} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'
import InputAddress from '../../../components/InputAddress'

function CreateShop() {
  console.log("CREATE-SHOP: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const {auth} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message, shop, shopApiCallCount} = useSelector((state) => state.shops)
  // const {isLoading, isError, isSuccess, message, shop, shopApiCallCount, renderPending} = useSelector((state) => state.shops)

  // is parameter passed? then surely it is edit form
  const { id } = useParams();
  const routeLocation = useLocation();
  // console.log(routeLocation)

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
    address,
    latLon, 
    pan, 
    gst, 
    tradeLicense,
    ownerName, 
    ownerEmail, 
    ownerPhone, 
    ownerAddress,
  } = formData

  const [ownerAddrIsSameAsShop, setOwnerAddrIsSameAsShop] = useState(false);
  const [shopSubmitted, setShopSubmitted] = useState(false);
  
  // on change
  const onChange = (e) => {
    // console.log("CREATE-SHOP: Non Address Form-Fields onChange")
    setFormData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }

  // copy shop address details to owner address details
  const copyShopAddrToOwner = () => {
    // console.log("CREATE-SHOP: copyShopAddrToOwner Status Change")
    setOwnerAddrIsSameAsShop(true)
  }

  // set address datas from child to current state
  const setAddrData = (inAddress, initialCallback) => {
    console.log("CREATE-SHOP: setAddrData from Child")
    setFormData((previousState) => ({
      ...previousState, 
      'address': inAddress,
    }))
    if(!initialCallback) {
      setOwnerAddrIsSameAsShop(false)
    }
  }
  const setOwnerAddrData = (inAddress, initialCallback) => {
    console.log("CREATE-SHOP: setOwnerAddrData from Child")
    setFormData((previousState) => ({
      ...previousState, 
      'ownerAddress': inAddress,
    }))
    if(!initialCallback) {
      setOwnerAddrIsSameAsShop(false)
    }
  }

  // 
  const onSubmit = (e) => {  // Final submission of the form to the server
    // 
    // console.log("CREATE-SHOP: onSubmit")
    e.preventDefault()
    // 
    const shopData = {
      email, 
      phone, 
      address,
      latLon, 
      pan, 
      gst, 
      tradeLicense,
      ownerName, 
      ownerEmail, 
      ownerPhone, 
      ownerAddress,
    }
    // console.log(shopData)
    dispatch(createShop(shopData))
    setShopSubmitted(true)
    toast.success('form submitted!!!!')
  }

  // 
  // use effect function call
  useEffect(() => {

    // if the form is edit form(known from the link name and the parameter passed), 
    // I need to load the shop details
    if ( id && !shop && shopApiCallCount === 0) {  //////
      dispatch(getShop(id))
      dispatch(gotShop())
    } 
    // if shop is received
    if(shop) {
    // if(shop && !renderPending) {
      // now set the formData, 
      setFormData((previousState) => ({  //////
        ...previousState, 
        'email': shop.email,
        'phone': shop.phone,
        'address': shop.address,
        'latLon': shop.lat_lon,
        'pan': shop.pan,
        'gst': shop.gst,
        'tradeLicense': shop.trade_license,
        'ownerName': shop.owner_name,
        'ownerEmail': shop.owner_email,
        'ownerPhone': shop.owner_phone,
        'ownerAddress': shop.owner_address,
      }))

      // dispatch(toggleAddressRender())
    }

    if(isError) {
      // console.log("CREATE-SHOP: UseEffect - 1")
      toast.error(message)
    }

    /* if(!auth) {
      // console.log("CREATE-SHOP: UseEffect - 2")
      toast.error('Create-Shop access is Unauthorized')
    } */

    if(shopSubmitted && isSuccess) {  // This needs to run after submit button is pressed
      // console.log("CREATE-SHOP: UseEffect - 3")
      navigate('/masterAdmin/shops')
    }

    if (routeLocation.pathname === '/masterAdmin/shops/create') {  //////
      dispatch(reset())
    } else {  // i.e. /masterAdmin/shops/edit/17 etc
      dispatch(resetExceptShop())
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shop, isError, message, isSuccess, dispatch, navigate, shopSubmitted])
    // [id, routeLocation, shop, shopApiCallCount, isError, message, isSuccess, dispatch, navigate, shopSubmitted])  // add renderPending if required
    // id, shop and shopApiCallCount needs default values for create shop to work
    // that can be done in shopSlice. 


  // 
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
          <InputAddress setAddrDataToShop={setAddrData} fillData={address} />
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
            <InputAddress setAddrDataToShop={setOwnerAddrData} fillData={address} /> 
            : <>
              <button type="button" className="btn btn-sm btn-outline-primary" onClick={copyShopAddrToOwner}>Same as Shop Address</button>
              <br />
              <br />
              <InputAddress setAddrDataToShop={setOwnerAddrData} fillData={ownerAddress} />
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

