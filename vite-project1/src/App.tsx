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
import firebaseconfig from './config/firebaseconfig';
import { AuthProvider } from './context/auth';
import RQPage from './pages/ReactQuery'
import Home from './pages/Home'
import Header from './components/Header'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyC2o-lE5ouxWHA_VPXjaLLX6yI-QOJPyaQ",
//   authDomain: "craigchat-59ff7.firebaseapp.com",
//   projectId: "craigchat-59ff7",
//   storageBucket: "craigchat-59ff7.appspot.com",
//   messagingSenderId: "777912052444",
//   appId: "1:777912052444:web:8ac745d83afcc5338aa219",
//   measurementId: "G-QQGHW2RHJV"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const queryClient = new QueryClient()

firebase.initializeApp(firebaseconfig)
const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {
  
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rqpage" element={<RQPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </AuthProvider>
  )
}

// const Header = () => {
//   return(
//     <div>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/rqpage">RQ Page</Link>
//       </nav>
//     </div>
//   )
// }

export default App
