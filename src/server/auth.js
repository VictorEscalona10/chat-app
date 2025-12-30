import axios from 'axios';

const API_URL = 'http://192.168.1.104:3000';

export const useAuth = () => {
  const register = async (userData) => {
    try {
      console.log('🔗 Conectando a:', API_URL);
      const response = await axios.post(`${API_URL}/auth/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      return {
        success: true,
        data: response.data,
        error: null
      };
      
    } catch (error) {
      console.error('❌ Error en registro:', {
        message: error.message,
        code: error.code,
        response: error.response?.data
      });
      
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 
               'No se pudo conectar al servidor. Verifica tu conexión.'
      };
    }
  };

  // Nueva función para verificar código
  const verifyCode = async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify`, {
        email,
        code
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      return {
        success: true,
        data: response.data,
        error: null
      };
      
    } catch (error) {
      console.error('❌ Error en verificación:', error.response?.data || error.message);
      
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Error al verificar el código'
      };
    }
  };

  // Función para reenviar código
  const resendCode = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-code`, {
        email
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      
      return {
        success: true,
        data: response.data,
        error: null
      };
      
    } catch (error) {
      console.error('❌ Error al reenviar:', error.response?.data || error.message);
      
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Error al reenviar el código'
      };
    }
  };

  return { 
    register,
    verifyCode,
    resendCode
  };
};