const Gym = require('../models/gymModel');

class GymService {

  async createGym(gymData) {
    const gym = new Gym(gymData);
    await gym.save();
    return gym;
  }

  async getAllGyms({ name = '', page = 1, limit = 10 } = {}) {
    page = parseInt(page);
    limit = parseInt(limit);
  
    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      throw new Error('Invalid page or limit value');
    }
  
    const filter = {};
    if (name) {
      filter.name = { $regex: new RegExp(name, 'i') };
    }
  
    const totalGyms = await Gym.countDocuments(filter);
    const totalPages = Math.ceil(totalGyms / limit);
  
    const gyms = await Gym.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('admins', 'name lastName email')
      .populate('members.user', 'name lastName email');
  
    return {
      totalGyms,
      totalPages,
      currentPage: page,
      gyms
    };
  }    
  
  async getGymById(id) {
    const gym = await Gym.findById(id).populate('admins', 'name lastName email').populate('members.user', 'name lastName email');
    return gym;
  }

  async updateGym(id, gymData) {
    const gym = await Gym.findByIdAndUpdate(id, gymData, { new: true }).populate('admins', 'name lastName email').populate('members.user', 'name lastName email');
    return gym;
  }

  async deleteGym(id) {
    const gym = await Gym.findByIdAndDelete(id);
    return gym;
  }
}

module.exports = new GymService();
