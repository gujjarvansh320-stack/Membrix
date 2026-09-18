// backend/src/controllers/planController.js
import Plan from '../models/Plan.js';
import Payment from '../models/Payment.js'; // NEW: Import Payment model

// 1. Create a new custom plan
export const createPlan = async (req, res) => {
  try {
    const { gymId, name, durationInMonths, price } = req.body;
    
    const newPlan = await Plan.create({ 
      gymId, 
      name, 
      durationInMonths: Number(durationInMonths), 
      price: Number(price) 
    });
    
    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: 'Error creating plan', error: error.message });
  }
};

// 2. Fetch all plans for a specific gym
export const getPlans = async (req, res) => {
  try {
    const { gymId } = req.query;
    
    // Find plans for this specific gym and sort them by price (lowest to highest)
    const plans = await Plan.find({ gymId }).sort({ price: 1 });
    
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
};

// 3. Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPlan = await Plan.findByIdAndDelete(id);
    
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: 'Error deleting plan', error: error.message });
  }
};

// 4. Delete a payment record
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPayment = await Payment.findByIdAndDelete(id);
    
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};

// 5. Update a payment record
export const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, paymentType } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { amount: Number(amount), paymentType },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    res.status(200).json({ message: 'Payment updated successfully', updatedPayment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};