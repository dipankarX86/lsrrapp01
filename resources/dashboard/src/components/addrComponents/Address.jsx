import { useCallback, useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
// import {toast} from 'react-toastify'
import axios from 'axios'

function Address({setAddrDataToShop, fillData}) {

  // console.log(fillData)
  // if fill data has state and city in it, we need cities and states loaded
  
  // Form prefill datas
  const [formPrefill, setFormPrefill] = useState({
    cities: [],
    states: [],
    countries: [],
  })


  const [addrData, setAddrData] = useState(
    (fillData && fillData.city) ? fillData :   // I can also provide the whole comparison 
    { 
      line1: '',
      line2: '',
      city: '0',
      state: '0',
      country: '0',
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

  // whatever the prefil data, there should be a initial return submit
  const [initialSubmitCount, setInitialSubmitCount] = useState(0);
  // setAddrDataToShop(addrData);  // figure out, why it cannot happen here? 
  // may need to learn working on vanilla js soon

  // needed to check if all the field data entered is updated to state
  const [submitPossible, setSubmitPossible] = useState(true);
  const [submitCount, setSubmitCount] = useState(1);
  //
  // to access anything that needs authorization
  const {auth} = useSelector((state) => state.auth)

  // load items from api

  const loadItem = useCallback((item, id) => {
    if(!auth) {
      // toast.error('Access of Country, State and City list are unauthorized!')
      console.log('Access of Country, State and City list are unauthorized!')
    } 
    // else if(item === 'countries' && formPrefill.countries.length>0) {  // if already exists do not call again
    //   console.log('countries already loaded')
    // } 
    // else if(item === 'states' && formPrefill.states.length>0 && formPrefill.states[0].id == id) {  // if already exists do not call again
    //   console.log('states already loaded')
    // } 
    // else if(item === 'cities' && formPrefill.cities.length>0 && formPrefill.cities[0].id == id) {  // if already exists do not call again
    //   console.log('cities already loaded')
    // } 
    else {
      const token = JSON.parse(localStorage.getItem('auth')).token
      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      const apiPath = '/api/'+item+'/2levels/'+id
      // 
      axios.get(apiPath, config).then((response) => {
        console.log(response.data)                        ////////////////
        setFormPrefill((previousState) => ({
          ...previousState, 
          [item]: response.data,
        }))
      });  
    }
  }, [])

  /* const loadItem = (item, id) => {
    if(!auth) {
      // toast.error('Access of Country, State and City list are unauthorized!')
      console.log('Access of Country, State and City list are unauthorized!')
    } 
    // else if(item === 'countries' && formPrefill.countries.length>0) {  // if already exists do not call again
    //   console.log('countries already loaded')
    // } 
    // else if(item === 'states' && formPrefill.states.length>0 && formPrefill.states[0].id == id) {  // if already exists do not call again
    //   console.log('states already loaded')
    // } 
    // else if(item === 'cities' && formPrefill.cities.length>0 && formPrefill.cities[0].id == id) {  // if already exists do not call again
    //   console.log('cities already loaded')
    // } 
    else {
      const token = JSON.parse(localStorage.getItem('auth')).token
      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      const apiPath = '/api/'+item+'/2levels/'+id
      // 
      axios.get(apiPath, config).then((response) => {
        console.log(response.data)                        ////////////////
        setFormPrefill((previousState) => ({
          ...previousState, 
          [item]: response.data,
        }))
      });  
    }
  } */

  // use effect function call
  useEffect(() => {
    
    /* if(!auth) {
      toast.error('Access of Country, State and City list are unauthorized!')
    } else {
      const token = JSON.parse(localStorage.getItem('auth')).token
      const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
      axios.get('/api/countries', config).then((response) => {
        console.log(response.data)
        setFormPrefill((previousState) => ({
          ...previousState, 
          'countries': response.data,
        }))
      });  
    } */
    
    // initial return submit, for possible changes in oener-address data, 
    // this needs to happen only once 
    if( initialSubmitCount === 0 ) {
      console.log(addrData)                        ////////////////
      setAddrDataToShop(addrData, true);

      loadItem('countries', 0)  // taking the opportunity to load the drop down before anything happens
      
      // if the data is passed through props, it may have state and city in it
      // if so, it will need the dropdown list
      if(fillData && fillData.state) {
        loadItem('states', fillData.country)
      } 
      if(fillData && fillData.city) {
        loadItem('cities', fillData.state)
      }

      setInitialSubmitCount(1)
    }
    
    // if submit is possible, submit it once and increase submit count to 1
    if( submitPossible && submitCount === 0 ) {
      console.log(addrData)
      setAddrDataToShop(addrData);
      setSubmitCount(1)
    }

  }, [auth, submitPossible, submitCount, initialSubmitCount, addrData, setAddrDataToShop, fillData, loadItem])
  
  // form effects
  const onChange = (e) => {

    // if it is CSC values you need additional steps
    if(e.target.name === 'country') {
      loadItem('states', e.target.value)
    } else if(e.target.name === 'state') {
      loadItem('cities', e.target.value)
    }

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

      {/* <div className="mb-3 formm-group">
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
      </div> */}
      <div className="mb-3 formm-group">
        <label htmlFor="city" className="form-label">City</label>
        <select 
          type="number" 
          className="form-select" 
          id="city" 
          name="city" 
          value={city} 
          onChange={onChange}
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
          aria-label="cities"
          disabled={state==='0'}
        >
          <option key={0} value={0}>Select a City</option>
          {formPrefill.cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      { state==='0' ? 
      <>
        <div className="alert alert-info" role="alert">
          Please select a State to enable Cities
        </div>
      </> 
      : <></> }
      
         
      {/* <div className="mb-3 formm-group">
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
      </div> */}
      <div className="mb-3 formm-group">
        <label htmlFor="state" className="form-label">State</label>
        <select 
          type="number" 
          className="form-select" 
          id="state" 
          name="state" 
          value={state} 
          onChange={onChange}
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
          aria-label="states"
          disabled={country==='0'}
        >
          <option key={0} value={0}>Select a State</option>
          {formPrefill.states.map(state => (
            <option key={state.id} value={state.id}>{state.name}</option>
          ))}
        </select>
      </div>
      { country==='0' ? 
      <>
        <div className="alert alert-info" role="alert">
          Please select a Country to enable States
        </div>
      </> 
      : <></> }
      
      {/* <div className="mb-3 formm-group">
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
      </div> */}
      <div className="mb-3 formm-group">
        <label htmlFor="country" className="form-label">Country</label>
        <select 
          type="number" 
          className="form-select" 
          id="country" 
          name="country" 
          value={country} 
          onChange={onChange}
          onFocus={onFocus} 
          onBlur={onBlur} 
          autoComplete="new-password" 
          aria-label="countris"
        >
          <option key={0} value={0}>Select a Country</option>
          {formPrefill.countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
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