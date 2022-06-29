import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getShops, gotShops, reset} from '../../../features/shops/shopSlice'

function Shops() {
  
  console.log("SHOPS: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  const {shops, shopsApiCallCount, isLoading, isError, isSuccess, message} = useSelector((state) => state.shops)

  // use effect function call
  useEffect(() => {
    if(isError) {
      toast.error(message)
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

    // dispatch(reset())

  }, [auth, isError, message, navigate, dispatch, shops])

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
          
          {
            shops && shops.data ? 
            shops.data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.id}</td>
                  <td>{val.id}</td>
                </tr>
              )
            })
            : <tr>
              <td>Loading...</td>
            </tr>
          }

        </tbody>
      </Table>
    </>
  )
}

export default Shops

