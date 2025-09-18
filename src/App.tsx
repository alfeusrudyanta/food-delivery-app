import Auth from './pages/Auth';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/success' element={<Success />} />

          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/restaurant/:id' element={<Restaurant />} />
            <Route path='/filter' element={<Filter />} />
            <Route path='/mycart' element={<MyCart />} />
            <Route path='/checkout' element={<CheckOut />} />
            <Route path='/order' element={<Order />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
