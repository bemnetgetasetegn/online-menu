import Items from './pages/Items';
import Menu from './pages/Menu'
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Menu />}></Route>
        <Route path='/items' element={<Items />} ></Route>
        <Route path='/admin/login' element={<AdminLogin />} ></Route>
        <Route path='/admin' element={<Admin />} ></Route>
      </Routes>
    </Router>
  )
}

export default App