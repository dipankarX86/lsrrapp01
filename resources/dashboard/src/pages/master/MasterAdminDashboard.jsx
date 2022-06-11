import {Link} from 'react-router-dom'
import { Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function MasterAdminDashboard() {
  return (
    <>
      <header className='header'>
        <li>
          <Link to='/master/shops'>
            Shops
          </Link>
        </li>
        <li>
          <Link to='/master/shops/1'>
            Shop-1
          </Link>
        </li>
        <li>
          <Link to='/master/shops/create'>
            create Shop
          </Link>
        </li>
        <li>
          <Link to='/master/shops/edit/1'>
            edit shop-1
          </Link>
        </li>

        
        <li>
          <Link to='/master/categories'>
            category
          </Link>
        </li>
        <li>
          <Link to='/master/categories/1'>
            category-1
          </Link>
        </li>
        <li>
          <Link to='/master/categories/create'>
            create category
          </Link>
        </li>
        <li>
          <Link to='/master/categories/edit/1'>
            edit category-1
          </Link>
        </li>

        
        <li>
          <Link to='/master/services'>
            Services
          </Link>
        </li>
        <li>
          <Link to='/master/services/1'>
            Service-1
          </Link>
        </li>
        <li>
          <Link to='/master/services/create'>
            create Service
          </Link>
        </li>
        <li>
          <Link to='/master/services/edit/1'>
            edit Service-1
          </Link>
        </li>
      </header>
      
      <Button variant="primary">Primary</Button>{' '}

      <Outlet />
  </>
  )
}

export default MasterAdminDashboard