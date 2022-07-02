import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getPagedShops, stopShopsTry, resetShops} from '../../../features/shops/shopSlice'  // getShops is removed
import Spinner from '../../../components/Spinner'
import {FaCaretLeft, FaCaretRight, FaSearch, FaPlus, FaSync} from 'react-icons/fa'

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Shops() {
  
  console.log("SHOPS: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  const {shops, shopsLoadTried, isLoading, isError, message} = useSelector((state) => state.shops)

  // Search form parameters
  const [searchParams, setSearchParams] = useState({
    srchString: '',
    srchSort: 'DESC_CREATED',
  })
  const {
    srchString,
    srchSort,
  } = searchParams

  // on change in Search
  const onSearchChange = (e) => {
    // console.log("CREATE-SHOP: Non Address Form-Fields onChange")
    setSearchParams((previousState) => ({
      ...previousState, 
      [e.target.name]: e.target.value,
    }))
  }

  // load page from search
  const loadSearchedShops = (e) => {
    e.preventDefault()
    // 
    const loadParams = { // now srch data needs to be sent to the api, through slice
      srchString,
      srchSort,
      'scrhPage': 1,
    }
    console.log(loadParams)
    dispatch(getPagedShops(loadParams))  // page 1 of searched results
  }

  // Function to call pages with current search parameters
  const loadPage = (event, param) => {
    // console.log(event);
    // console.log(param);
    let srchPage = 0
    // 
    // if current page is > 1 , and prev page, then load data for pageNumber = cp-1
    // if cp < max page, and next page, then load data for pageNumber = cp+1
    if (param === 'prev') {
      if (shops.current_page > 1) {
        srchPage = shops.current_page - 1
      } else {
        toast.error('You are in 1st page')
        return  // will it exit rest of the code? will see 
      }
    } else if (param === 'next') {
      if (shops.current_page < shops.last_page) {
        srchPage = shops.current_page + 1
      } else {
        toast.error('You have reached the end')
        return  // to exit rest of the code 
      }
    } else if (param === 'reset') {
      setSearchParams((previousState) => ({
        ...previousState, 
        'srchString': '',
        'srchSort': 'DESC_CREATED',
      }))
      srchPage = 1
    }
    // 
    let loadParams = {}
    if (param === 'reset') {
      loadParams = { // THIS EXTRA STEM IS REQUIRES BECAUSE, SET-STATE IS ASYNCHROUNOUS(TAKES MORE TIME THE IT TAKES TO RUN DISPATCH)
        'srchString': '',
        'srchSort': '',
        'scrhPage': srchPage,
      }
    } else {
      loadParams = { // to the api, through slice; const removed & used let
        srchString,
        srchSort,
        'scrhPage': srchPage,
      }
    }

    console.log(loadParams)
    dispatch(getPagedShops(loadParams))
  };


  // Use-Effect Function Call
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(!auth) {
      console.log('Shops access is Unauthorized')
    } 
    
    if(shopsLoadTried === 0) {
      // dispatch(getPagedShops(1))  // this is to be changed to new format supporting search
      const loadParams = { // to the api, through slice
        srchString,
        srchSort,
        'scrhPage': 1,
      }
      console.log(loadParams)
      dispatch(stopShopsTry())
      dispatch(getPagedShops(loadParams))    // THIS GOES TO INF LOOP IF THE SERVER IS DOWN, SET LIMITS FOR MAX CALL COUNT
    }
    
    dispatch(resetShops())  
      // always note, does resetting removes something which is useEffect is dependent on? if so, is it reloading it? 
      // Use complete - reset() in pages where shops is not required, so when coming to shops page from another shop page shops will be clear already
      // HOW WILL I CLEAR FIRST TIME????

  }, [auth, shopsLoadTried, isError, message, navigate, dispatch])  
    // removed dependency of shops to avoid infinite loop

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <form className="formm-search" onSubmit={loadSearchedShops}>

        <div className="container-1">
          <div className="box-1 formm-group">
            <input 
              type="text" 
              className="" 
              id="srchString" 
              name="srchString" 
              value={srchString} 
              placeholder="Type in: id, location, phone number or email then press search .." 
              onChange={onSearchChange}
            />
          </div>

          <div class="box-2 radio-btn-container">
            <div
              className="radio-btn"
              onClick={() => {
                setSearchParams((prevState) => ({
                  ...prevState, 
                  'srchSort': 'DESC_CREATED',
                }))
              }}
            >
              <input
                type="radio"
                value={srchSort}
                name="srchSort"
                checked={srchSort == "DESC_CREATED"}
              />
              &nbsp;Newest
            </div>
            <div
              className="radio-btn"
              onClick={() => {
                setSearchParams((prevState) => ({
                  ...prevState, 
                  'srchSort': 'ASC_CREATED',
                }))
              }}
            >
              <input
                type="radio"
                value={srchSort}
                name="srchSort"
                checked={srchSort == "ASC_CREATED"}
              />
              &nbsp;Oldest
            </div>
          </div>

          <div className="box-3">
            <button type="submit" className="btn btn-outline-primary ms-1 mt-1"><FaSearch /> Search</button>
            <a type="button" className="btn btn-outline-primary ms-1 mt-1" href="#/masterAdmin/shops/create"><FaPlus /> New Shop</a>
          </div>
        </div>

      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Location</th>
            {/* <th>Map Location</th> */}
            <th>Owner Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
          { shops && shops.data ? 
            shops.data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{ (val.address ? (val.address.csc) : '') }</td>
                  {/* <td>{val.lat_lon}</td> */}
                  <td>{val.owner_name}</td>
                  <td>
                    <a href={'tel:'+val.phone}>{val.phone}</a> and <a href={'tel:'+val.owner_phone}>{val.owner_phone}</a>
                    {/* {val.phone+' & '+val.owner_phone} */}
                  </td>
                  <td>

                    <ButtonGroup className="">
                      <Button>View</Button>
                      <DropdownButton as={ButtonGroup} title="More" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                      </DropdownButton>
                    </ButtonGroup>

                  </td>
                </tr>
              )
            }) : (<tr>
              <td>Loading...</td>
            </tr>) }

        </tbody>
      </Table>
      
      <div className="container app-footer-dash">
        <div className="row">
          <div className="col p-2 d-flex justify-content-start" >
            <button type="button" className="btn btn-outline-info" onClick={event => loadPage(event, 'prev')}><FaCaretLeft /> Previous</button>
          </div>
          <div className="col p-2 d-flex justify-content-center">
            <button type="button" className="btn btn-outline-warning" onClick={event => loadPage(event, 'reset')}><FaSync /> Reset</button>
          </div>
          <div className="col p-2 d-flex justify-content-end">
            <button type="button" className="btn btn-outline-info" onClick={event => loadPage(event, 'next')}>Next <FaCaretRight /></button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Shops

