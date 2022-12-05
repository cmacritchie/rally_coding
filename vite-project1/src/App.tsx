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
// import firebaseconfig from './config/firebaseconfig';
import firebaseconfig from './config/firebaseconfig'
import { AuthProvider } from './context/auth';
import RQPage from './pages/ReactQuery'
import Home from './pages/Home'
import CraigChat from './pages/CraigChat'
import ChatRoom from './pages/ChatRoom';
import Header from './components/Header'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { getFirestore } from 'firebase/firestore'


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const queryClient = new QueryClient()

const app = firebase.initializeApp(firebaseconfig)
const auth = firebase.auth()
export const db = getFirestore(app);


function App() {
  
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rqpage" element={<RQPage />} />
          <Route path="/craigchat" element={<CraigChat />} />
          <Route path="room/:id" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
