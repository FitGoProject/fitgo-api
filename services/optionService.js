const Gym = require('../models/gymModel');
const Option = require('../models/optionModel');

class OptionService {
  async createOption(gymId, optionData) {
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return null;
    }

    const option = new Option(optionData);
    await option.save();

    gym.options.push(option);
    await gym.save();

    return option;
  }

  async getOptions(gymId) {
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return null;
    }

    return gym.options;
  }

  async getOption(gymId, optionId) {
    // First, find the gym to ensure it exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      throw new Error('Gym not found');
    }
  
    // Check if the gym has the specified option
    if (!gym.options.includes(optionId)) {
      throw new Error('Option not associated with the specified gym');
    }
  
    // Retrieve the option from the Option collection
    const option = await Option.findById(optionId);
    if (!option) {
      throw new Error('Option not found');
    }
  
    return option;
  }

  async updateOption(optionId, optionData) {
    const option = await Option.findByIdAndUpdate(optionId, optionData, { new: true });

    return option;
  }

  async deleteOption(gymId, optionId) {
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return null;
    }

    const option = await Option.findByIdAndDelete(optionId);

    if (!option) {
      return null;
    }

    gym.options = gym.options.filter((opt) => opt._id.toString() !== option._id.toString());
    await gym.save();

    return option;
  }
}

module.exports = new OptionService();
