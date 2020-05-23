import React, { useState, useEffect, createContext } from 'react';
import { toast } from 'react-toastify';

import api from '../services/api';
import Auth from '../services/auth';

const UserContext = createContext({ user: {}, setUser() {} });

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    !user.id &&
      (async () => {
        try {
          const { status, data } = await api.get(`/employers/${Auth.getUserId()}`);

          if (status === 200) return setUser(data.user);
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        } catch {
          toast.error('Ocorreu um erro inesperado em nosso servidor');
        }
      })();
    // eslint-disable-next-line
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export default UserContext;
