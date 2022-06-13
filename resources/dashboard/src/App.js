import React, { Suspense } from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import the pages
import AdminUserLogin from './pages/AdminUserLogin';

// All Master Admin Pages imported Bellow
import MasterAdminDashboard from './pages/masterAdmin/MasterAdminDashboard';
import MasterAdminHome from './pages/masterAdmin/MasterAdminHome';
//
import CreateShop from './pages/masterAdmin/shops/CreateShop';
import EditShop from './pages/masterAdmin/shops/EditShop';
import Shop from './pages/masterAdmin/shops/Shop';
import Shops from './pages/masterAdmin/shops/Shops';
//
import CreateAccount from './pages/masterAdmin/accounts/CreateAccount';
import EditAccount from './pages/masterAdmin/accounts/EditAccount';
import Account from './pages/masterAdmin/accounts/Account';
import Accounts from './pages/masterAdmin/accounts/Accounts';
//
import CreateCategory from './pages/masterAdmin/categories/CreateCategory';
import EditCategory from './pages/masterAdmin/categories/EditCategory';
import Category from './pages/masterAdmin/categories/Category';
import Categories from './pages/masterAdmin/categories/Categories';
//
import CreateService from './pages/masterAdmin/services/CreateService';
import EditService from './pages/masterAdmin/services/EditService';
import Service from './pages/masterAdmin/services/Service';
import Services from './pages/masterAdmin/services/Services';

// Shop Pages
import ShopAdminDashboard from './pages/shopAmin/ShopAdminDashboard';
import ShopAdminHome from './pages/shopAmin/ShopAdminHome';

// Front-Desk Pages
import FrontDeskDashboard from './pages/frontDesk/FrontDeskDashboard';
import FrontDeskHome from './pages/frontDesk/FrontDeskHome';

// Transporter Pages
import TransporterDashboard from './pages/transporter/TransporterDashboard';
import TransporterHome from './pages/transporter/TransporterHome';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerHome from './pages/worker/WorkerHome';

// Home Service Pages
const HomeServiceDashboard = React.lazy(() => import('./pages/homeService/HomeServiceDashboard'));
const HomeServiceHome = React.lazy(() => import('./pages/homeService/HomeServiceHome'));

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<AdminUserLogin />} />

          <Route path='/masterAdmin' element={<MasterAdminDashboard />} >
            <Route path='/masterAdmin' element={<MasterAdminHome />} />

            <Route path='/masterAdmin/shops' element={<Shops />} />
            <Route path='/masterAdmin/shops/1' element={<Shop />} />
            <Route path='/masterAdmin/shops/create' element={<CreateShop />} />
            <Route path='/masterAdmin/shops/edit/1' element={<EditShop />} />
            
            <Route path='/masterAdmin/accounts' element={<Accounts />} />
            <Route path='/masterAdmin/accounts/1' element={<Account />} />
            <Route path='/masterAdmin/accounts/create' element={<CreateAccount />} />
            <Route path='/masterAdmin/accounts/edit/1' element={<EditAccount />} />
            
            <Route path='/masterAdmin/categories' element={<Categories />} />
            <Route path='/masterAdmin/categories/1' element={<Category />} />
            <Route path='/masterAdmin/categories/create' element={<CreateCategory />} />
            <Route path='/masterAdmin/categories/edit/1' element={<EditCategory />} />
            
            <Route path='/masterAdmin/services' element={<Services />} />
            <Route path='/masterAdmin/services/1' element={<Service />} />
            <Route path='/masterAdmin/services/create' element={<CreateService />} />
            <Route path='/masterAdmin/services/edit/1' element={<EditService />} />
          </Route>

          <Route path='/shopAdmin' element={<ShopAdminDashboard />}>
            <Route path='/shopAdmin' element={<ShopAdminHome />} />
          </Route>
          
          <Route path='/frontDesk' element={<FrontDeskDashboard />}>
            <Route path='/frontDesk' element={<FrontDeskHome />} />
          </Route>
          
          <Route path='/transporter' element={<TransporterDashboard />}>
            <Route path='/transporter' element={<TransporterHome />} />
          </Route>
          
          <Route path='/worker' element={<WorkerDashboard />}>
            <Route path='/worker' element={<WorkerHome />} />
          </Route>
          
          <Route 
            path='/homeService' 
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <HomeServiceDashboard />
              </Suspense>}
          >
            <Route path='/homeService' element={<HomeServiceHome />} />
          </Route>
          
        </Routes>
      </Router>
      
      <div className="container app-footer">
        <div className="row">
          <div className="col p-2">
            Column
          </div>
          <div className="col p-2">
            This is from App.js
          </div>
          <div className="col p-2">
            Column
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
