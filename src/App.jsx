import {Outlet} from 'react-router-dom'
import Navbar from './component/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <main>
      <ToastContainer/>
      <Navbar/>
      <Outlet/>
    </main>
  )
}

export default App
