const Subscription = require('../models/subscriptionModel');

class SubscriptionService {
  async createSubscription(subscriptionData) {
    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    return subscription;
  }

  async getAllSubscriptions({ page = 1, limit = 10 } = {}) {
    page = parseInt(page);
    limit = parseInt(limit);
    
    if (!Number.isInteger(page) || !Number.isInteger(limit) || page < 1 || limit < 1) {
      throw new Error('Invalid page or limit value');
    }
  
    const totalSubscriptions = await Subscription.countDocuments();
    const totalPages = Math.ceil(totalSubscriptions / limit);
  
    const subscriptions = await Subscription.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('userId gymId optionId');
  
    return {
      totalSubscriptions,
      totalPages,
      currentPage: page,
      subscriptions
    };
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
