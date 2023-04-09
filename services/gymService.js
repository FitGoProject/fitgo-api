const Gym = require('../models/gymModel');

class GymService {
  async createGym(gymData) {
    const gym = new Gym(gymData);
    await gym.save();
    return gym;
  }

  async getAllGyms() {
    const gyms = await Gym.find().populate('admins', 'name lastName email').populate('members.user', 'name lastName email');
    return gyms;
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
