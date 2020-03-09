import React,{ useEffect, useState, createContext } from 'react';
import DIRE_DATA from './dire.data';

export const DireContext = createContext({
    sections: [],
});

const DireProvider = ({ children }) => {
    const [ sections, setSections ] = useState([]);

    useEffect( ()=>{
        setSections(DIRE_DATA);
    },[] );

    return (
        <DireContext.Provider value={{
            sections,
        }} >
            { children }
        </DireContext.Provider>
    );   
};

export default DireProvider;