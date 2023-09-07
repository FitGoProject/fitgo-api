const Gym = require('../models/gymModel');
const Plan = require('../models/planModel');

class PlanService {
  async createPlan(gymId, planData) {
    try {
      const gym = await Gym.findById(gymId);
  
      if (!gym) {
        console.log(`Gym with ID ${gymId} not found`);
        return null;
      }
  
      const plan = new Plan(planData);
      await plan.save();
  
      gym.plans.push(plan);
      await gym.save();
  
      return plan;
    } catch (error) {
      console.error('Error in createPlan:', error);
      throw error;
    }
  }  

  async getPlans(gymId, { page = 1, limit = 10 } = {}) {
    try {
      const gym = await Gym.findById(gymId);
  
      if (!gym) {
        return null;
      }
  
      const totalPlans = await Plan.countDocuments({ _id: { $in: gym.plans } });
      const totalPages = Math.ceil(totalPlans / limit);
  
      const plans = await Plan.find({ _id: { $in: gym.plans } })
        .skip((page - 1) * limit)
        .limit(limit);
  
      return {
        totalPlans,
        totalPages,
        currentPage: page,
        plans
      };
    } catch (error) {
      throw error;
    }
  }  

  async getPlan(gymId, planId) {
    // First, find the gym to ensure it exists
    const gym = await Gym.findById(gymId);
    if (!gym) {
      return null;
    }

    // Check if the gym has the specified plan
    if (!gym.plans.includes(planId)) {
      return null;
    }

    // Retrieve the plan from the Plan collection
    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    return plan;
  }

  async updatePlan(planId, planData) {
    const plan = await Plan.findByIdAndUpdate(planId, planData, { new: true });

    return plan;
  }

  async deletePlan(gymId, planId) {
    const gym = await Gym.findById(gymId);

    if (!gym) {
      return null;
    }

    const plan = await Plan.findByIdAndDelete(planId);

    if (!plan) {
      return null;
    }

    gym.plans = gym.plans.filter((opt) => opt._id.toString() !== plan._id.toString());
    await gym.save();

    return plan;
  }
}

module.exports = new PlanService();
