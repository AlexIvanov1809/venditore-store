import IUser from '@/types/userType';
import { makeAutoObservable } from 'mobx';

export default class UserStore {
  private _isAuth: boolean;

  private _user: {} | IUser['user'];

  constructor() {
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }

  setUser(user: IUser['user']) {
    if (user) {
      this._user = user;
      this._isAuth = true;
    }
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
