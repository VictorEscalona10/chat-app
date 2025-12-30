import axios from 'axios';

const API_URL = 'http://192.168.1.104:3000';

export const useAuth = () => {
  const register = async (userData, setRegisterApi) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (setRegisterApi) {
        setRegisterApi(response.data);
      }
      
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      console.error('Error en registro:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Error en el registro';
      
      if (setRegisterApi) {
        setRegisterApi({ error: errorMsg });
      }
      
      return {
        success: false,
        data: null,
        error: errorMsg
      };
    }
  };

  return {
    register
  };
};