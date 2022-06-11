import {Link} from 'react-router-dom'

function AdminUserLogin() {
  return (
    <>
      <h1>All Available Dashboard links</h1>
      <li>
          <Link to='/master'>
            Master
          </Link>
      </li>
      <li>
          <Link to='/shop'>
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