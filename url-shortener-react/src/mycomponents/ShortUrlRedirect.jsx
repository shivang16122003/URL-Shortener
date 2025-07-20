import { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader';

function ShortUrlRedirect() {


    const url=useParams();


    useEffect(() => {
        if(url){
            console.log(url)
            const puraBabyUrl=import.meta.env.VITE_API_URL+`/${url.url}`;
            console.log(puraBabyUrl)
           window.location.href = import.meta.env.VITE_API_URL+`/${url.url}`;;
        }}, [url]);

  return (
     <div className="flex flex-col items-center justify-center h-screen bg-white">
      <ClipLoader color="#9333ea" size={50} /> {/* Purple-600 from Tailwind */}
      <h1 className="text-2xl font-bold mt-6 text-center text-gray-800">Redirecting...</h1>
      <p className="text-gray-500 mt-2 text-center">
        If you are not redirected, please check the URL.
      </p>
    </div>
  )
}

export default ShortUrlRedirect
