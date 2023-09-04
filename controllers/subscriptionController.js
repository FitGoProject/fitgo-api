const subscriptionService = require('../services/subscriptionService');

exports.createSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSubscriptions = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid page or limit value' });
    }

    const subscriptions = await subscriptionService.getAllSubscriptions({ page, limit });

    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubscriptionById = async (req, res) => {
  const subscription = await subscriptionService.getSubscriptionById(req.params.id);
  if (subscription) {
    res.status(200).json(subscription);
  } else {
    res.status(404).json({ error: 'Subscription not found' });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.updateSubscription(req.params.id, req.body);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.deleteSubscription(req.params.id);
    if (subscription) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Subscription not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
