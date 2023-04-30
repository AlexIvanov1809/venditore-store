class UserErrors extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = UserErrors;
