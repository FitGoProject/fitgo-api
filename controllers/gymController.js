const gymService = require('../services/gymService');
const planService = require('../services/planService');

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

// Plans
exports.createPlan = async (req, res) => {
  try {
    const plan = await planService.createPlan(req.params.id, req.body);

    if (!plan) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(201).json(plan);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }  
};

exports.getPlans = async (req, res) => {
  try {
    const plans = await planService.getPlans(req.params.id, req.query);

    if (!plans) {
      return res.status(404).json({ error: 'Gym not found' });
    }

    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlan = async (req, res) => {
  try {
    const plan = await planService.getPlan(req.params.id, req.params.planId);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await planService.updatePlan(req.params.planId, req.body);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }  
};

exports.deletePlan = async (req, res) => {
  try {
    const plan = await planService.deletePlan(req.params.id, req.params.planId);

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
