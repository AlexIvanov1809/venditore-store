const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const UserDto = require('../dtos/user.dto');
const UserErrors = require('../error/userErrors');
const { where } = require('sequelize');

class UserService {
  async registration(email, password, role) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw new UserErrors(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      password: hashPassword,
      role,
      activationLink,
    });

    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`,
    // );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } });
    if (!user) {
      throw new UserErrors('Некорректная ссылка активации');
    }

    return User.update({ isActivated: true }, { where: { id: user.id } });
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new UserErrors('Пользователь не был найден');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new UserErrors('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new UserErrors('');
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new UserErrors('');
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getUsers() {
    const users = await User.findAll();

    return users.map((user) => new UserDto(user));
  }
  async removeUser(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
