import Auth from './pages/Auth';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Restaurant from './pages/Restaurant';
import Filter from './pages/Filter';
import MyCart from './pages/MyCart';
import CheckOut from './pages/CheckOut';
import Success from './pages/Success';
import Order from './pages/Order';
import Profile from './pages/Profile';
import ProtectedRoute from '@/components/ProtectedRoute';

const Layout = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path='/auth' element={<Auth />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/success' element={<Success />} />
        </Route>

        {/* Protected route */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/restaurant/:id' element={<Restaurant />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/mycart' element={<MyCart />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/order' element={<Order />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
