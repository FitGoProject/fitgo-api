const Gym = require('../models/gymModel');
const Option = require('../models/optionModel');

class OptionService {
  async createOption(gymId, optionData) {
    try {
      const gym = await Gym.findById(gymId);
  
      if (!gym) {
        console.log(`Gym with ID ${gymId} not found`);
        return null;
      }
  
      const option = new Option(optionData);
      await option.save();
  
      gym.options.push(option);
      await gym.save();
  
      return option;
    } catch (error) {
      console.error('Error in createOption:', error);
      throw error;
    }
  }  

  async getOptions(gymId, { page = 1, limit = 10 } = {}) {
    const gym = await Gym.findById(gymId);
  
    if (!gym) {
      return null;
    }
  
    page = parseInt(page);
    limit = parseInt(limit);
    
    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      throw new Error('Invalid page or limit value');
    }
  
    const totalOptions = await Option.countDocuments({ _id: { $in: gym.options } });
    const totalPages = Math.ceil(totalOptions / limit);
  
    const options = await Option.find({ _id: { $in: gym.options } })
      .skip((page - 1) * limit)
      .limit(limit);
  
    return {
      totalOptions,
      totalPages,
      currentPage: page,
      options
    };
  }  

  async getOption(gymId, optionId) {
    // First, find the gym to ensure it exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return null;
    }

    // Check if the gym has the specified option
    if (!gym.options.includes(optionId)) {
      return null;
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
