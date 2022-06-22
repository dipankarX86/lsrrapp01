import { useState, useEffect } from 'react'

function Address(props) {

  const [addrData, setAddrData] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  })

  const {
    line1,
    line2,
    city,
    state,
    country,
    postalCode,
  } = addrData


  // use effect function call
  useEffect(() => {
    
  }, [])

  
  // on change
  const onChange = (e) => {
    setAddrData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))

    // send the data to shop form 
    // props.setAddrData(JSON.stringify(addrData));
    props.setAddrData(addrData);
  }

  
  return (
    <>
      <div className="mb-3 formm-group">
        <label htmlFor="line1" className="form-label">Address Line 1</label>
        <input 
          type="text" 
          className="" 
          id="line1" 
          name="line1" 
          value={line1} 
          placeholder="address line 1" 
          onChange={onChange}
        />
      </div>
      <div className="mb-3 formm-group">
        <label htmlFor="line2" className="form-label">Address Line 2</label>
        <input 
          type="text" 
          className="" 
          id="line2" 
          name="line2" 
          value={line2} 
          placeholder="address line 2" 
          onChange={onChange}
        />
      </div>
      <div className="mb-3 formm-group">
        <label htmlFor="city" className="form-label">City</label>
        <input 
          type="number" 
          className="" 
          id="city" 
          name="city" 
          value={city} 
          placeholder="enter city the shop is in" 
          onChange={onChange}
        />
      </div>
      <div className="mb-3 formm-group">
        <label htmlFor="state" className="form-label">State</label>
        <input 
          type="number" 
          className="" 
          id="state" 
          name="state" 
          value={state} 
          placeholder="choose state" 
          onChange={onChange}
        />
      </div>
      <div className="mb-3 formm-group">
        <label htmlFor="country" className="form-label">Country</label>
        <input 
          type="number" 
          className="" 
          id="country" 
          name="country" 
          value={country} 
          placeholder="choose country" 
          onChange={onChange}
        />
      </div>
      <div className="mb-3 formm-group">
        <label htmlFor="postalCode" className="form-label">Postal Code</label>
        <input 
          type="text" 
          className="" 
          id="postalCode" 
          name="postalCode" 
          value={postalCode} 
          placeholder="enter postel code" 
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default Address