import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import Creators from './pages/Creators';
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import PrivateRoute from './pages/PrivateRoute';

function App() {

  const location=useLocation();
  const hideNavbarFooter=["/dashboard","/login","/register"].includes(location.pathname);
  const {blogs,isAuthenticated}=useAuth();
  console.log(blogs)

  return (
    <div>
      {!hideNavbarFooter && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/blogs' element={<Blogs/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/creators' element={<Creators/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/blog/update/:id' element={<UpdateBlog/>}></Route>
        <Route path='/blog/:id' element={<PrivateRoute><Detail/></PrivateRoute>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      {!hideNavbarFooter && <Footer/>}
    </div>
  );
}

export default App;
