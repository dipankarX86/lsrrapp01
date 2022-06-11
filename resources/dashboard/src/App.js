import {HashRouter as Router, Routes, Route} from 'react-router-dom'

// import the pages
import AdminUserLogin from './pages/AdminUserLogin';

// All Master Admin Pages imported Bellow
import MasterAdminDashboard from './pages/master/MasterAdminDashboard';
import MasterAdminHome from './pages/master/MasterAdminHome';
//
import CreateShop from './pages/master/shops/CreateShop';
import EditShop from './pages/master/shops/EditShop';
import Shop from './pages/master/shops/Shop';
import Shops from './pages/master/shops/Shops';
//
import CreateCategory from './pages/master/categories/CreateCategory';
import EditCategory from './pages/master/categories/EditCategory';
import Category from './pages/master/categories/Category';
import Categories from './pages/master/categories/Categories';
//
import CreateService from './pages/master/services/CreateService';
import EditService from './pages/master/services/EditService';
import Service from './pages/master/services/Service';
import Services from './pages/master/services/Services';

// Shop Pages
import ShopDashboard from './pages/shop/ShopDashboard';

// Front-Desk Pages
import FrontDeskDashboard from './pages/frontDesk/FrontDeskDashboard';

// Transporter Pages
import TransporterDashboard from './pages/transporter/TransporterDashboard';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';

// Home Service Pages
import HomeServiceDashboard from './pages/homeService/HomeServiceDashboard';

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<AdminUserLogin />} />

          <Route path='/master' element={<MasterAdminDashboard />} >
            <Route path='/master' element={<MasterAdminHome />} />

            <Route path='/master/shops' element={<Shops />} />
            <Route path='/master/shops/1' element={<Shop />} />
            <Route path='/master/shops/create' element={<CreateShop />} />
            <Route path='/master/shops/edit/1' element={<EditShop />} />
            
            <Route path='/master/categories' element={<Categories />} />
            <Route path='/master/categories/1' element={<Category />} />
            <Route path='/master/categories/create' element={<CreateCategory />} />
            <Route path='/master/categories/edit/1' element={<EditCategory />} />
            
            <Route path='/master/services' element={<Services />} />
            <Route path='/master/services/1' element={<Service />} />
            <Route path='/master/services/create' element={<CreateService />} />
            <Route path='/master/services/edit/1' element={<EditService />} />
          </Route>

          <Route path='/shop' element={<ShopDashboard />} />
          
          <Route path='/frontDesk' element={<FrontDeskDashboard />} />
          
          <Route path='/transporter' element={<TransporterDashboard />} />
          
          <Route path='/worker' element={<WorkerDashboard />} />
          
          <Route path='/homeService' element={<HomeServiceDashboard />} />
          
        </Routes>
      </Router>
      
      {/* <h3>This is from App.js(Can be Footer too ..)</h3> */}
    </div>
  );
}

export default App;
