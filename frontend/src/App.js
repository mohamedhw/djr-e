import './index.css'
import {useState} from 'react'
import { Routes, Route} from 'react-router-dom'
import LayOut from './Layout';
import PrivetRoute from './PrivetRoute';
import Home from './store/Home';
import NavBar from "./component/Navbar.js"
import Login from "./store/Login"
import Register from "./store/Register"
import Profile from "./store/Profile"
import Detail from "./store/Detail"
import Cart from './store/Cart';
import WishList from './store/WishList';

function App() {
  const [q, setQ] = useState(null)

  return (
    
    <div className="App">
      <LayOut>
        <NavBar setQ={setQ} />
        <Routes>
          <Route element={<PrivetRoute/>}>
          </Route>
          <Route path='/:postId' element={<Detail />} />
          <Route path='/wish' element={<WishList />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route exact element={<Home q={q}/>} path="/" />
        </Routes>
      </LayOut>
    </div>
  );
}

export default App;
