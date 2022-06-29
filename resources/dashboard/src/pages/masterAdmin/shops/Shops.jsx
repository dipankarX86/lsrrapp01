import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getShops, gotShops, resetShops} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'

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
    if ( shops.length === 0 && shopsApiCallCount === 0) {
      // console.log('SHOPS API CALL')
      dispatch(getShops())
      dispatch(gotShops())
    } 

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
    </>
  )
}

export default Shops

