export default interface IUser {
  accessToken: TokenJWT;
  user: {
    email: string;
    id: number;
    role: 'USER' | 'ADMIN' | 'OWNER';
    isActivated: boolean;
  };
}

type TokenJWT = 'string';
