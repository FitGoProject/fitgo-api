const Subscription = require('../models/subscriptionModel');

class SubscriptionService {
  async createSubscription(subscriptionData) {
    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    return subscription;
  }

  async getAllSubscriptions() {
    return await Subscription.find().populate('userId gymId optionId');
  }

  async getSubscriptionById(id) {
    return await Subscription.findById(id).populate('userId gymId optionId');
  }

  async updateSubscription(id, subscriptionData) {
    return await Subscription.findByIdAndUpdate(id, subscriptionData, { new: true });
  }

  async deleteSubscription(id) {
    return await Subscription.findByIdAndDelete(id);
  }
}

module.exports = new SubscriptionService();
