import { useState, useEffect , useContext, createContext } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
const AuthContext = createContext()

const AuthProvider =({children})=>{
    const [auth , setAuth]=useState({
        user : null,
        token :""

    })
    // 
    useEffect( ()=>{
      const getData = Cookies.get('auth');
      if(getData){
       const parseData = JSON.parse(getData);
       setAuth({
        ...auth,
        user : parseData.user,
        token : parseData.token
       })
       axios.defaults.headers.common['Authorization'] = auth?.token
      }
    }, [])
    return (
        <AuthContext.Provider value={[auth , setAuth]} >
            {children}
        </AuthContext.Provider>
    )
}

 const useAuth = () => useContext(AuthContext)
 export { AuthProvider , useAuth }