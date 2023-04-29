import { makeAutoObservable } from 'mobx';

export default class ErrorStore {
  private _error: string;

  constructor() {
    this._error = '';
    makeAutoObservable(this);
  }

  get error() {
    return this._error;
  }

  setError(error: string) {
    this._error = error;
  }
}
