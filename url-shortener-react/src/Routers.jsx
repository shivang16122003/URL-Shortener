


import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import LandingPage from './mycomponents/LandingPage'
import AboutPage from './mycomponents/AboutPage'
import Navbar from './mycomponents/Navbar'
import Footer from './mycomponents/Footer'
import RegisterPage from './mycomponents/RegisterPage'
import LoginPage from './mycomponents/LoginPage'
import {Toaster} from 'react-hot-toast'
import Dashboard from './mycomponents/Dashboard'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import ShortUrlRedirect from './mycomponents/ShortUrlRedirect'
import PrivateRouter from './mycomponents/PrivateRouter'
import ErrorPage from './mycomponents/ErrorPage'
import AddUrlPopup from './mycomponents/AddUrlPopup'



const queryClient = new QueryClient()
function AppRouter() {
  

  return (
     <>
         <QueryClientProvider client={queryClient}>
      
      <Navbar/>
      <Toaster position="top-center"/>
     <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<PrivateRouter isPublic={true} ><RegisterPage/></PrivateRouter>} />
         <Route path="/login" element={<PrivateRouter isPublic={true} ><LoginPage/></PrivateRouter>} />
         <Route path="/dashboard" element={<PrivateRouter isPublic={false} ><Dashboard/></PrivateRouter>} />
         <Route path="/s/:url" element={<ShortUrlRedirect />} />
         <Route path="/shorten" element={<AddUrlPopup/>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />

     </Routes>
     <Footer/>
   
    </QueryClientProvider>
     
     </>
  )
}

export default AppRouter
   


export const SubDomainRouter=()=>{
     return (
     <>
     <Routes><Route path="/:url" element={<ShortUrlRedirect />} /></Routes>
      
        
     
     </>
  )

}