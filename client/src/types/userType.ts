export default interface IUser {
  accessToken: TokenJWT;
  user: UserData;
}

type TokenJWT = 'string';

export type UserData = {
  email: string;
  id: number;
  role: 'USER' | 'ADMIN' | 'OWNER';
  isActivated: boolean;
};
