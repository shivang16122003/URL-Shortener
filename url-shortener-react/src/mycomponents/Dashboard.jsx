import React, { useState } from 'react';
import { useCustomContext } from '../ContextApi/contextApi.jsx';
import fetchClicksViaDate from './fetchClicksViaDate.jsx';
import AddUrlPopup from './AddUrlPopup.jsx';

import toast, { Toaster } from 'react-hot-toast';
import ClicksBarChart from './ClicksBarChart';
import FetchMyUrls from './fetchMyUrls.jsx';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';



const Dashboard = () => {
  const { token } = useCustomContext();
  const [popupOpen, setPopupOpen] = useState(false);
  const [expandedUrl, setExpandedUrl] = useState(null);
      const [isCopied, setCopied] = useState(null);

      const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
      );

      const copiedUrl=import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" ;
      

      const handleCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  } catch  {
    toast.error("Failed to copy");
  }
};

  const startDate = '2025-07-01';
  const endDate = '2026-07-11';

  const onError = (error) => {
    console.error('Error fetching data:', error);
  };

  const { data, isLoading, error } = fetchClicksViaDate(startDate, endDate, token, onError);
  const labels = data?.map((item) => item.date) || [];
  const clicks = data?.map((item) => item.clicks) || [];

  const{ data: urlData, isLoading: isUrlLoading,error:urlError } = FetchMyUrls(token, onError);
    
    const labelsbabyUrls = urlData?.map((item) => item.babyUrl) || [];
    const labeslclicksData = urlData?.map((item) => item.clicks) || [];
    const navigate= useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <ClipLoader color="#2563EB" size={80} />
        <p className="mt-4 text-lg font-medium text-blue-600">Loading Data...</p>
      </div>
    );
  }
 if (isUrlLoading) {
       return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <ClipLoader color="#2563EB" size={80} />
        <p className="mt-4 text-lg font-medium text-blue-600">Loading Url Data...</p>
      </div>
    );
    }
  if (error) {
    navigate('/error');
  }
    if (urlError) {
    navigate('/error');
  }

  const handlePopupOpen = () => setPopupOpen(true);
  const handlePopupClose = () => setPopupOpen(false);
  const handleUrlSubmit = (originalUrl) => {
    console.log('Submitted URL:', originalUrl);
  };

  const toggleAnalytics = (id) => {
    setExpandedUrl(prev => (prev === id ? null : id));
  };
   


  //list ulr data



  const isEmpty = labels.length === 0;
   
  return (
    <div className="mx-auto max-w-4xl px-4 pt-24 space-y-8 mb-10">


         {/* Chart Section */}
      <div className="relative">
        <ClicksBarChart labels={labels} data={clicks} />

        {isEmpty && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl">
            <div className="text-center">
              <p className="text-gray-500 font-medium text-lg mb-4">No URL clicks found in this date range.</p>
              <button
                onClick={handlePopupOpen}

                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm shadow"
              >
                Add URLs
              </button>
              
              

              
            </div>
            
          </div>
        )} </div>
      <Toaster position="top-center" />

      <h2 className="text-xl font-semibold text-blue-600">Your Shortened URLs</h2>





      {(!urlData|| urlData.length === 0) ? (
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600 mb-4">No URL clicks found in this date range.</p>
          <button onClick={handlePopupOpen} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">Add URLs</button>
        </div>
      ) : (
        urlData.map((u) => {


               

          return (
            <div key={u.id} className="rounded-xl border border-slate-300 bg-slate-200 p-4  space-y-2 shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-center">
               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
         <Link
    target="_blank"
    className="text-blue-600 hover:underline break-all"
    to={import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${u.babyUrl}`}
  >
    {subDomain + "/s/" + `${u.babyUrl}`}
  </Link>

  <FaExternalLinkAlt className="text-blue-600 hover:underline text-lg" />
       </div>

                <button
                  onClick={() => {
                    setCopied((prev) => (prev === u.id ? null : u.id));
                    handleCopy(copiedUrl + `${u.babyUrl}`);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-md"
                >
                  {isCopied===u.id ? 'Copied!' : 'Copy'}
                </button>

                
              
                
                
              </div>

              <div className='flex justify-between items-center'>
                

                <div>
                    <p className="text-sm text-gray-500">Original URL:</p>
                <p className="truncate">{u.ogUrl?u.ogUrl:"N/A"}</p>
                </div>

                <button
                onClick={() => toggleAnalytics(u.id)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-md"
              >
                {expandedUrl === u.id ? 'Hide Analytics' : 'View Analytics'}
              </button>
              </div>

              <div className="text-sm text-gray-600">
                <p className=" text-green-600">CLICKS: <strong>{u.clicks}</strong></p></div>

              

              {expandedUrl === u.id && (
                <div className="mt-4">
                 
                  
                  <ClicksBarChart labels={labelsbabyUrls} data={labeslclicksData} />
                </div>
              )}
            </div>
          );
        })
      )}

      <div className="text-center">
        <button
          onClick={handlePopupOpen}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow"
        >
          Add New URL
        </button>
      </div>

      <AddUrlPopup
        open={popupOpen}
        handleClose={handlePopupClose}
        handleSubmit={handleUrlSubmit}
      />
    </div>
   
  );
};

export default Dashboard;
