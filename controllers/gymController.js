const gymService = require('../services/gymService');

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
    const gyms = await gymService.getAllGyms();
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
