import React, { createContext} from 'react';
import { loginWithGoogle } from '../API/firebase/firebase';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [user, setUser] = React.useState(null);

    const login = async () => {
        const user = await loginWithGoogle();

        if (!user) {
            // TODO: Handle failed login
        }

        setUser(user);
    };

    const value = { user, login };

    return (<AuthContext.Provider value={value} {...props} />);
};

export { AuthContext, AuthProvider };