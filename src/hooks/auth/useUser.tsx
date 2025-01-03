import { useContext } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import { AuthContextInterface } from '../../interface/auth/auth.interface';

export const useAuth = (): AuthContextInterface => {
  const context: AuthContextInterface | undefined = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
