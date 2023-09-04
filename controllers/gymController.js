const gymService = require('../services/gymService');
const optionService = require('../services/optionService');

exports.createGym = async (req, res) => {
  try {
    const gym = await gymService.createGym(req.body);
    res.status(201).json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGyms = async (req, res) => {
  try {
    let { name = '', page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit value' });
    }

    const gyms = await gymService.getAllGyms({ name, page, limit });
    res.status(200).json(gyms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGymById = async (req, res) => {
  try {
    const gym = await gymService.getGymById(req.params.id);

    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(200).json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGym = async (req, res) => {
  try {
    const gym = await gymService.updateGym(req.params.id, req.body);

    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(200).json(gym);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGym = async (req, res) => {
  try {
    const gym = await gymService.deleteGym(req.params.id);

    if (!gym) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(200).json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Options
exports.createOption = async (req, res) => {
  try {
    const option = await optionService.createOption(req.params.id, req.body);

    if (!option) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(201).json(option);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }  
};

exports.getOptions = async (req, res) => {
  try {
    const options = await optionService.getOptions(req.params.id, req.query);

    if (!options) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOption = async (req, res) => {
  try {
    const option = await optionService.getOption(req.params.id, req.params.optionId);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOption = async (req, res) => {
  try {
    const option = await optionService.updateOption(req.params.optionId, req.body);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    res.status(200).json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }  
};

exports.deleteOption = async (req, res) => {
  try {
    const option = await optionService.deleteOption(req.params.id, req.params.optionId);

    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    res.status(200).json({ message: 'Option deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
