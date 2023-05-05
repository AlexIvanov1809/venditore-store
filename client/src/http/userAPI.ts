import { $host } from './index';

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

  checkAuth: async () => {
    const { data } = await $host.get(`${ENDPOINT}/refresh`);
    localStorage.setItem('token', data.accessToken);

    return data.user;
  },

  getUsers: async () => {
    const { data } = await $host.get(ENDPOINT);

    return data;
  },

  removeUser: async (id: string | number) => {
    const { data } = await $host.delete(`${ENDPOINT}/${id}`);

    return data;
  }
};

export default authService;
