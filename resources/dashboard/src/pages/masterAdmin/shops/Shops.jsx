import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import Table from 'react-bootstrap/Table';
import {toast} from 'react-toastify'
import {getShops, reset} from '../../../features/shops/shopSlice'
import Spinner from '../../../components/Spinner'
// import {FaCaretLeft, FaCaretRight} from 'react-icons/fa'

function Shops() {
  
  console.log("SHOPS: Entered")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {auth} = useSelector((state) => state.auth)
  const {shops, isLoading, isError, message} = useSelector((state) => state.shops)

  // Use-Effect Function Call
  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(!auth) {
      toast.error('Create-Shop access is Unauthorized')
    }

    dispatch(getShops())
    
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
          <div className="col p-2 d-flex justify-content-center">
            Column
          </div>
          <div className="col p-2 d-flex justify-content-center">

            {/* <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item pointt"><a className="page-link"><FaCaretLeft /></a></li>
                <li className="page-item pointt"><a className="page-link">1</a></li>
                <li className="page-item pointt"><a className="page-link">2</a></li>
                <li className="page-item pointt"><a className="page-link">3</a></li>
                <li className="page-item pointt"><a className="page-link"><FaCaretRight /></a></li>
              </ul>
            </nav> */}

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

