const User = require('../models/userModel');
const ValidationError = require('../errors/validationError');
const AuthenticationError = require('../errors/authenticationError');
const jwt = require('jsonwebtoken');

class UserService {
  async register(userData) {
    const { name, lastName, email, password, phone, personalId, roles } = userData;

    // Check for empty fields
    if (!name || !lastName || !email || !password || !phone || !personalId || !roles.length) {
      throw new ValidationError('Some fields are empty');
    }

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ValidationError('User with this email already exists');
    }

    const user = new User(userData);
    await user.save();
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id, roles: user.roles }, process.env.SECRET_KEY);
    return { user, token };
  }

  async getAllUsers({ page = 1, limit = 10 } = {}) {
    page = parseInt(page);
    limit = parseInt(limit);
    
    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      throw new ValidationError('Invalid page or limit value');
    }
  
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
  
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);
  
    return {
      totalUsers,
      totalPages,
      currentPage: page,
      users
    };
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
