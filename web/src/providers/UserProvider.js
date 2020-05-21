import React, { useState, useEffect, createContext } from 'react';

import api from '../services/api';
import Auth from '../services/auth';

export const UserContext = createContext({ user: {}, setUser() {} });

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    !user.id &&
      (async () => {
        try {
          const { status, data } = await api.get(`/profiles/${Auth.getUserId()}`);

          if (status === 200) return setUser(data.user);
        } catch {}
      })();
    // eslint-disable-next-line
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}
