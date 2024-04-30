import { useState } from 'react'
import './App.css'
import ImageIndex from './Components/Image'
import Navbar from './Components/layout/navbar'


function App() {
  return (
    <>
      <div>
        <Navbar />
        <ImageIndex />
       </div>
    </>
  )
}
export default App
