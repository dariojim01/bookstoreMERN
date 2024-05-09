import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const EditBook = () => {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { id }= useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5000/v1/books/${id}`)
    .then((res)=>{
        setLoading(false);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);

    })
    .catch((error)=>{
        setLoading(false);
        alert('Ha ocurrido un error, chequear la consola');
        console.log(error);
      })
  },[]);
  const navigate = useNavigate();
  const handleEditBook = () =>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_API_URL}/v1/books/${id}`, data)
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
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border-2 border-gray-5000 px-4 py-2 w-full'
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='border-2 border-gray-5000 px-4 py-2 w-full'
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className='border-2 border-gray-5000 px-4 py-2 w-full'
            />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Guardar
        </button>
      </div>
    </div>
  )
}

export default EditBook
