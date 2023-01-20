module.exports = class UserDto {
  email;
  _id;
  isActivated;
  role;

  constructor(model) {
    this.email = model.email;
    this._id = model._id;
    this.isActivated = model.isActivated;
    this.role = model.role;
  }
};
