import { $authHost, $host } from './index';

const ENDPOINT = 'v1/user';

const authService = {
  registration: async (email: string, password: string, role: string) => {
    const { data } = await $host.post(`${ENDPOINT}/registration`, {
      email,
      password,
      role
    });
    localStorage.setItem('token', data.accessToken);

    return data.user;
  },

  login: async (email: string, password: string) => {
    const { data } = await $host.post(`${ENDPOINT}/login`, {
      email,
      password
    });
    localStorage.setItem('token', data.accessToken);

    return data.user;
  },

  logout: async () => {
    await $host.post(`${ENDPOINT}/logout`);
    localStorage.removeItem('token');
  },

  checkAuth: async () => {
    const { data } = await $authHost.get(`${ENDPOINT}/refresh`);
    localStorage.setItem('token', data.accessToken);

    return data.user;
  }
};

export default authService;
