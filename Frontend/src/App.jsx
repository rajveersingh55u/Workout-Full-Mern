import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'




//pages and component imports
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { WorkoutsContextProvider } from './context/WorkoutContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { UseAuthContext } from './hooks/UseAuthContext'

function App() {
  const {user} = UseAuthContext()

  return (
   
    <div className="App">
     <WorkoutsContextProvider>
     <BrowserRouter>
     <Navbar />

     <div className='page'>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} /> 
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      </div>

      </BrowserRouter>
      </WorkoutsContextProvider>
    </div>
    
  )
}

export default App
