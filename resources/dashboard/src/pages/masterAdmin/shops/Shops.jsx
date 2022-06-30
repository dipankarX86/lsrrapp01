import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getShops, gotShops, resetShops} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'
import {FaCaretLeft, FaCaretRight} from 'react-icons/fa'

function Shops() {
  
  console.log("SHOPS: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  const {shops, shopsApiCallCount, isLoadingShops, isErrorShops, messageShops} = useSelector((state) => state.shops)

  // use effect function call
  useEffect(() => {
    if(isErrorShops) {
      toast.error(messageShops)
    }

    if(!auth) {
      toast.error('Create-Shop access is Unauthorized')
    }

    // call shops to display
    /* if ( shops.length === 0 && shopsApiCallCount === 0) {
      // console.log('SHOPS API CALL')
      dispatch(getShops())
      dispatch(gotShops())
    }  */
    dispatch(getShops())
    
    dispatch(resetShops())

  }, [auth, isErrorShops, messageShops, navigate, dispatch, shops])

  if(isLoadingShops) {
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
          <div className="col p-2 d-flex justify-content-center">
            Column
          </div>
          <div className="col p-2 d-flex justify-content-center">

            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item pointt"><a className="page-link"><FaCaretLeft /></a></li>
                <li className="page-item pointt"><a className="page-link">1</a></li>
                <li className="page-item pointt"><a className="page-link">2</a></li>
                <li className="page-item pointt"><a className="page-link">3</a></li>
                <li className="page-item pointt"><a className="page-link"><FaCaretRight /></a></li>
              </ul>
            </nav>

          </div>
          <div className="col p-2 d-flex justify-content-center">
            Column
          </div>
        </div>
      </div>

    </>
  )
}

export default Shops

