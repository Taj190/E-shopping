import React from 'react'
import { LiaSpinnerSolid } from "react-icons/lia";
import {useState , useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import  './spinner.css'

function Spinner({path = "login"}) {
  const navigate = useNavigate();
  const location = useLocation()
  const [count , setCount] = useState(5)

  useEffect( ()=>{
    
   const interveral= setInterval( ()=>{
      setCount((prevCount)=> --prevCount)
    } , 1000)
    if(count === 0){
      navigate(`/${path}` , {
        state : location.pathname
      })
    }
    return ()=> clearInterval(interveral)
  } , [count , navigate , location, path ])
  return (
    <>
   
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 >login required .Redirecting to you to login page in {count} sec</h1>
    <LiaSpinnerSolid className="spinner" size={60} />  {/* Spinner icon */}
  </div>
  </>
  )
}

export default Spinner