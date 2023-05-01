import IUser from '@/types/userType';
import { makeAutoObservable } from 'mobx';

export default class UserStore {
  private _isAuth: boolean;

  private _user: null | IUser['user'];

  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser['user'] | null) {
    this._user = user;
    this._isAuth = !!user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
