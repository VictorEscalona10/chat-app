import axios from 'axios';

const API_URL = 'http://192.168.1.102:3000';

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

  // Función para verificar código de registro
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

  // NUEVA: Función para login (solicitar código)
  const login = async (email) => {
    try {
      console.log('🔗 Conectando a:', API_URL);
      const response = await axios.post(`${API_URL}/auth/login`, {
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
      console.error('❌ Error en login:', {
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

  // NUEVA: Función para verificar código de login
  const verifyLogin = async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-login`, {
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
      console.error('❌ Error en verificación de login:', error.response?.data || error.message);
      
      return {
        success: false,
        data: null,
        error: error.response?.data?.message || 'Error al verificar el código de login'
      };
    }
  };

  return { 
    register,
    verifyCode,
    resendCode,
    login,          
    verifyLogin     
  };
};