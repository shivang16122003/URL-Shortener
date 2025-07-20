import React, { Children } from 'react'
import { useState } from 'react';

import { createContext } from 'react';

import { useContext as useReactContext } from 'react';

 const Context = createContext();

const ContextProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage?.getItem('token') || null);
   
    return (
        <Context.Provider value={{ token, setToken }}>
            {children}
        </Context.Provider>
    );
};
export default ContextProvider;
// eslint-disable-next-line react-refresh/only-export-components
export  const useCustomContext = () => {
    const contextValue = useReactContext(Context);
   
    return contextValue;
};


