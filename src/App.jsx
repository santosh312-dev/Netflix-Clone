import React, { use, useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth} from './firebase'; // Ensure you have the correct path to your firebase.js file
import { ToastContainer, toast } from 'react-toastify';

const App = () => {

  const navigate = useNavigate();


  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if (user){
        console.log("Logged In:");
        navigate('/')
      }
      else{
        console.log("Logged Out");
        navigate('/login');
      }
    })
  },[])

  return (
    <div>
       <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
};

export default App;
