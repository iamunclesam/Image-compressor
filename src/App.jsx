// import { useState } from 'react'
import './App.css'
import ImageIndex from './Components/Image'
import Navbar from './Components/layout/navbar'
import ImageUpload from './Components/Image/image_result'
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
     
       
        <Navbar />
        {/* <ImageIndex /> */}
       
        <Routes>
        <Route path="/" element={ <ImageIndex /> } />
        <Route path="/upload" element={ <ImageUpload />} />
        </Routes>
       
    </>
  )
}
export default App
