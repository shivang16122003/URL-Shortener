import React from 'react'
import { Navigate } from 'react-router-dom';
import { useCustomContext } from '../ContextApi/contextApi';
import toast, { Toaster } from 'react-hot-toast';

function PrivateRouter({children, isPublic}){
    const {token} = useCustomContext();
    if(isPublic) 
        return token? <Navigate to="/dashboard"/> : children; //public page
    return token ? children : <><Toaster/> {toast.error("You are not logged in") }<Navigate to="/login"/></>;//private page
  
}

export default PrivateRouter
