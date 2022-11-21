import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './App.css'

import RQPage from './pages/ReactQuery'
import Home from './pages/Home'

const queryClient = new QueryClient()

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rqpage" element={<RQPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

const Header = () => {
  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/rqpage">RQ Page</Link>
      </nav>
    </div>
  )
}

export default App
