import { useState, useEffect } from 'react'

function Address({setAddrDataToShop, fillData}) {

  const [addrData, setAddrData] = useState(
    fillData ? fillData :
    {
      line1: '',
      line2: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
    }
  )

  const {
    line1,
    line2,
    city,
    state,
    country,
    postalCode,
  } = addrData

  // // whatever the prefil data, there should be a initial return submit
  // const [initialSubmitCount, setInitialSubmitCount] = useState(0);
  // // setAddrDataToShop(addrData);  // figure out, why it cannot happen here? 
  // // may need to learn working on vanilla js soon

  // needed to check if all the field data entered is updated to state
  const [submitPossible, setSubmitPossible] = useState(true);
  const [submitCount, setSubmitCount] = useState(1);
  //
  // use effect function call
  useEffect(() => {
    
    // // initial return submit, for possible changes in oener-address data, 
    // // this needs to happen only once 
    // if( initialSubmitCount === 0 ) {
    //   console.log(addrData)
    //   setAddrDataToShop(addrData);
    //   setInitialSubmitCount(1)
    // }
    
    // if submit is possible, submit it once and increase submit count to 1
    if( submitPossible && submitCount === 0 ) {
      console.log(addrData)
      setAddrDataToShop(addrData);
      setSubmitCount(1)
    }

  }, [submitPossible, submitCount, addrData, setAddrDataToShop])
  
  // form effects
  const onChange = (e) => {
    setAddrData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }
  const onFocus = () => {
    setSubmitCount(0)
    setSubmitPossible(false)
  }
  const onBlur = () => {
    setSubmitPossible(true)
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
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
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
        />
      </div>
    </>
  )
}

export default Address