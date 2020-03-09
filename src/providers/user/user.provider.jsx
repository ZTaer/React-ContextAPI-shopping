import React,{ createContext, useState } from 'react';

export const UserContext = createContext({
    currentUser: null,
    changeCurrentUser: ()=>{},
    clearCurrentUser: ()=>{},
});

const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    
    const changeCurrentUser = user => setCurrentUser(user);
    const clearCurrentUser = () => setCurrentUser(null);

    return <UserContext.Provider value={{
            currentUser,
            changeCurrentUser,
            clearCurrentUser,
    }}>{children}</UserContext.Provider>;
}

export default UserProvider;