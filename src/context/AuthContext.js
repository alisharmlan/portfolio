import React from 'react';
import {
  onAuthStateChanged,
  getAuth,
} from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadingPanel = () => {
    return (
      <div className='font-poppins justify-center items-center flex w-full h-full'>
        loading..
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? loadingPanel() : children}
    </AuthContext.Provider>
  );
};
