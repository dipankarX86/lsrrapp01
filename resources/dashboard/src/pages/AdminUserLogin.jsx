import {Link} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';

function AdminUserLogin() {
  return (
    <>
      <h1>All Available Dashboard links</h1>
      <li>
          <Link to='/masterAdmin'>
            Master
          </Link>
      </li>
      <li>
          <Link to='/shopAdmin'>
            Shop
          </Link>
      </li>
      <li>
          <Link to='/frontDesk'>
            frontDesk
          </Link>
      </li>
      <li>
          <Link to='/transporter'>
            transporter
          </Link>
      </li>
      <li>
          <Link to='/worker'>
            worker
          </Link>
      </li>
      <li>
          <Link to='/homeService'>
            homeService
          </Link>
      </li>
    </>
  )
}

export default AdminUserLogin