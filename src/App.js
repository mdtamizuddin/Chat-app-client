import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import RequireAuth from './components/Hooks/RequireAuth';
import Login from './components/User/Login'
import Signup from './components/User/Signup';
import Verify from './components/User/Verify';
function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route
          path='/'
          element={<RequireAuth>
            <Chat />
          </RequireAuth>}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
