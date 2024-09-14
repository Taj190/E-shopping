import  { useState  , useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const UseCategory = () => {
    const [categories, setCategories] = useState([])

    const getCategories = async()=>{
      const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/category/get-all-category`) ;
       if(data){
         setCategories(data.data)
        
       }
       else{
         console.log('Failed to get category list')
       }
    }
    useEffect(()=>{
      getCategories()
     
    },[])
  return (
  categories
  )
}
