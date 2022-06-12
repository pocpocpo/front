import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  role: string;
  token: string;
  user: User;
}

interface SignInCredentials {
  role: 'Doctor' | 'Patient';
  email: string;
  password: string;
}

interface AuthContextData {
  role: string;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  singOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const role = localStorage.getItem('@ClinicApp:role');
    const token = localStorage.getItem('@ClinicApp:token');
    const user = localStorage.getItem('@ClinicApp:user');

    if (role && token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { role, token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ role, email, password }) => {
    const response = await api.post('sessions', {
      role,
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ClinicApp:role', role);
    localStorage.setItem('@ClinicApp:token', token);
    localStorage.setItem('@ClinicApp:user', JSON.stringify(user));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({ role, token, user });
  }, []);

  const singOut = useCallback(() => {
    localStorage.removeItem('@ClinicApp:role');
    localStorage.removeItem('@ClinicApp:token');
    localStorage.removeItem('@ClinicApp:user');
    setData({} as AuthState);
  }, []);

  const values = useMemo(
    () => ({ role: data.role, user: data.user, signIn, singOut }),
    [data],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
