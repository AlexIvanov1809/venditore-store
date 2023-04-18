import { $authHost, $host } from './index';

const ENDPOINT = 'user';

interface RegData {
  email: string;
  password: string;
  role: string;
}

const authService = {
  registration: async ({ email, password, role }: RegData) => {
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

  checkAuth: async (signal: AbortSignal) => {
    const { data } = await $authHost.get(`${ENDPOINT}/refresh`, { signal });
    localStorage.setItem('token', data.accessToken);

    return data.user;
  }
};

export default authService;
