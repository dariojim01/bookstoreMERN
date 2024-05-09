import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';

const DeleteBook = () => {

  const [loading, setLoading] = useState(false);
  const { id }= useParams();
  const navigate = useNavigate();
 
  const handleDeleteBook = () =>{
  
    setLoading(true);
    
    axios
      .delete(`${import.meta.env.VITE_API_URL}/v1/books/${id}`)
      .then(() =>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        alert('Ha ocurrido un error, chequear la consola');
        console.log(error);
      })
  };
  return (
    <div className='p-4'>
       <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3>Are you sure you want to delete this book:  </h3>
        <h3> {id}</h3>
       
        <button
          className='p-4 bg-red-700 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >Yes, delete book </button>
      </div>
    </div>
  )
}

export default DeleteBook
