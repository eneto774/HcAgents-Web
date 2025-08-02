import { api } from '@/services/api';
import { jwtDecode } from 'jwt-decode';

export const useJwt = () => {

  const isValidToken = (accessToken: string) => {
    try {
      const decoded = jwtDecode<{ exp: number }>(accessToken);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const updateSession = (accessToken: string) => {
    if (isValidToken(accessToken)) {
      localStorage.setItem('@HcAgents:accessToken', accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        localStorage.removeItem('@HcAgents:accessToken');
        delete api.defaults.headers.common.Authorization;
    }
  };

  return { isValidToken, updateSession };
}