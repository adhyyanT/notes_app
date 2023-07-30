import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router';
import Signup from './components/Signup';
import Notes from './components/Notes';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/signup' element={<Signup />} />
        <Route path='/notes' element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
