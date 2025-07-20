


import { BrowserRouter, Routes,Route } from 'react-router-dom'

import getRouter from './routingUtils/getRouter'




function App() {
  
   const CurrApp=getRouter();

  return (
    <BrowserRouter>
    <CurrApp/>
    </BrowserRouter>
  )
}

export default App
