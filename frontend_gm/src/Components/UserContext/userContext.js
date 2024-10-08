import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userDetails) => {
        setUser(userDetails);
        localStorage.setItem('user', JSON.stringify(userDetails));
        console.log(localStorage.getItem('user'))  // Save user to localStorage
    };

    return (
        <UserContext.Provider value={{ user, login }}>
            {children}
        </UserContext.Provider>
    );
};
