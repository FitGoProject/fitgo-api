const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserService {
  async register(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.SECRET_KEY);

    // {
    //   expiresIn: config.jwtExpiresIn,
    // });
    return { user, token };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  async updateUser(id, userData) {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    return user;
  }
}

module.exports = new UserService();
