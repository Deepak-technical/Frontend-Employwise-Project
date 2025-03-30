import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route,Routes } from 'react-router-dom';
import UsersList from './pages/UserList';
function App() {
return(
  <>
  <Navbar/>
  <Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/users" element={<UsersList />}/>
  </Routes>
  <Footer/>
  </>
)
}

export default App;
