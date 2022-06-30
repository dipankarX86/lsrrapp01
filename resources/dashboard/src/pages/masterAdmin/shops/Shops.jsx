import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getPagedShops, reset} from '../../../features/shops/shopSlice'  // getShops is removed
import Spinner from '../../../components/Spinner'
import {FaCaretLeft, FaCaretRight} from 'react-icons/fa'

function Shops() {
  
  console.log("SHOPS: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  const {shops, isLoading, isError, message} = useSelector((state) => state.shops)

  // 
  const loadPage = (event, param) => {
    // console.log(event);
    console.log(param);

    // if current page is > 1 , and prev page, then load data for pageNumber = cp-1
    // if cp < max page, and next page, then load data for pageNumber = cp+1
    if (param === 'prev') {
      if (shops.current_page > 1) {
        dispatch(getPagedShops(shops.current_page - 1))
      } else {
        toast.error('You are in 1st page')
      }
    } else if (param === 'next') {
      if (shops.current_page < shops.last_page) {
        dispatch(getPagedShops(shops.current_page + 1))
      } else {
        toast.error('You have reached the end')
      }
    }
  };

  // Use-Effect Function Call
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(!auth) {
      console.log('Shops access is Unauthorized')
    } else {
      dispatch(getPagedShops(1))
    }
    
    dispatch(reset())  
      // always note, does resetting removes something which is useEffect is dependent on? if so, is it reloading it? 

  }, [auth, isError, message, navigate, dispatch])  
    // removed dependency of shops to avoid infinite loop

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          
          { shops && shops.data ? 
            shops.data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{ (val.address ? (val.address.city  + ', ' + val.address.state  + ', ' + val.address.country) : '') }</td>
                  <td>{val.id}</td>
                  <td>{val.id}</td>
                  <td>{val.id}</td>
                </tr>
              )
            }) : (<tr>
              <td>Loading...</td>
            </tr>) }

        </tbody>
      </Table>
      
      <div className="container app-footer-dash">
        <div className="row">
          <div className="col p-2 d-flex justify-content-center pointt" onClick={event => loadPage(event, 'prev')}>
            <FaCaretLeft />
          </div>
          <div className="col p-2 d-flex justify-content-center">
            Future location for numbered pagination
          </div>
          <div className="col p-2 d-flex justify-content-center pointt" onClick={event => loadPage(event, 'next')}>
            <FaCaretRight />
          </div>
        </div>
      </div>

    </>
  )
}

export default Shops

