import IUser, { UserData } from '@/types/userType';
import { makeAutoObservable } from 'mobx';

export default class UserStore {
  private _isAuth: boolean;

  private _user: null | IUser['user'];
  private _users: UserData[];

  constructor() {
    this._isAuth = false;
    this._user = null;
    this._users = [];
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser['user'] | null) {
    this._user = user;
    this._isAuth = !!user;
  }

  setUsers(users: UserData[]) {
    this._users = users;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get users() {
    return this._users;
  }
}
