import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getCsc, gotCsc} from '../features/addresses/addressSlice'

function InputAddress({setAddrDataToShop, fillData}) {

  console.log("ADDRESS: Entered")
  
  // Form prefill datas
  const [formPrefill, setFormPrefill] = useState({
    cities: [],
    states: [],
    countries: [],
  })

  const [addrData, setAddrData] = useState(
    (fillData && fillData.city) ? fillData :   // I can also provide the whole comparison 
    // if fill data has state and city in it, we need cities and states loaded
    { 
      line1: '',
      line2: '',
      city: '0',
      state: '0',
      country: '0',
      postalCode: '',       //  Try reducing number of STATES, try using REDUX instead ---- 24th June 2022
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

  // needed to check if all the field data entered is updated to state
  const [submitPossible, setSubmitPossible] = useState(true);
  const [submitCount, setSubmitCount] = useState(1);
  //
  // to access anything that needs authorization
  const {auth} = useSelector((state) => state.auth)
  const {csc, cscApiCallCount} = useSelector((state) => state.addresses)   // Now use csc, : csc csn be used to load items

  const dispatch = useDispatch()
  
  // load items from api
  const loadItem = (item, countryId, stateId) => {  // useCallback dont seem to do anything, as the returned memorised value 
                                                    // is not being used, try removing it later
    if(!auth) {
      console.log('Access of Country, State and City list are unauthorized!')
    } 
    else {
      if(item === 'countries') {  // Returns COUNTRIES to Dropdown
        setFormPrefill((previousState) => ({
          ...previousState, 
          'countries': csc,
        }))
      } else if(item === 'states') {  // Returns STATES to Dropdown
        for (let i = 0; i < csc.length; i++) {
          if(countryId === csc[i].id) {                                     // BUT WHY COUNTRY-ID AND STATE -ID ARE STRING IN THE FIRST PLACE?
            setFormPrefill((previousState) => ({
              ...previousState, 
              'states': csc[i].states,
            }))
          }
        }
      } else if(item === 'cities') {  // Returns CITIES to Dropdown
        // console.log('SETTING CITIES')
        //
        let countryIndex = 0;  // we need country index, instead of id in csc array
        for (let i = 0; i < csc.length; i++) {
          if(countryId === csc[i].id) {
            countryIndex = i
          }
        }
        for (let i = 0; i < csc[countryIndex].states.length; i++) {
          if(stateId === csc[countryIndex].states[i].id) {
            setFormPrefill((previousState) => ({
              ...previousState, 
              'cities': csc[countryIndex].states[i].cities,
            }))
          }
        }
      }
    }
  }

  // use effect function call
  useEffect(() => {
    // if city, state and country are empty in redux store we need them loaded first
    if ( !csc && cscApiCallCount === 0) {
      // console.log('CSC API CALL')
      dispatch(getCsc())
      dispatch(gotCsc())
    } 

    // initial return submit, for possible changes in oener-address data, 
    // this needs to happen only once 
    if( csc && initialSubmitCount === 0 ) {
      // console.log(cscApiCallCount)
      // console.log("ADDRESS: UseEffect - 1: Setting INITIAL Addr data bk to Shop")
      setAddrDataToShop(addrData, true);

      loadItem('countries', 0, 0)  // taking the opportunity to load the drop down before anything happens
      
      // if the data is passed through props, it may have state and city in it
      // if so, it will need the dropdown list
      if(fillData && fillData.state) {
        // console.log("ADDRESS: UseEffect - 1A: Start Loading States") 
        loadItem('states', parseInt(fillData.country), 0)
      } 
      if(fillData && fillData.city) {
        // console.log("ADDRESS: UseEffect - 1B: Start Loading Cities") 
        loadItem('cities', parseInt(fillData.country), parseInt(fillData.state))
      }

      setInitialSubmitCount(1)
    }
    
    // if submit is possible, submit it once and increase submit count to 1
    if( submitPossible && submitCount === 0 ) {
      // console.log(addrData)
      // console.log("ADDRESS: UseEffect -[ 2 ]: Setting Addr data bk to Shop") 
      setAddrDataToShop(addrData, false);
      setSubmitCount(1)
    }

  }, [submitPossible, submitCount, initialSubmitCount, addrData, setAddrDataToShop, fillData, loadItem, dispatch, csc, cscApiCallCount])  
      // States must be passed, as it is not JSX
  
  // form effects
  const onChange = (e) => {
    // console.log("ADDRESS: OnChange")

    // if it is CSC values you need additional steps
    if(e.target.name === 'country') {
      loadItem('states', parseInt(e.target.value), 0)
    } else if(e.target.name === 'state') {
      loadItem('cities', parseInt(country), parseInt(e.target.value))
    }

    setAddrData((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }
  const onFocus = () => {
    // console.log('ADDRESS: onFocus')
    setSubmitCount(0)
    setSubmitPossible(false)
  }
  const onBlur = () => {
    // console.log('ADDRESS: onBlur')
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

export default InputAddress

