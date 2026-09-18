import Gym from "../models/Gym.js";
import User from "../models/User.js";

// @desc    Create a new gym profile
// @route   POST /api/gyms
export const createGym = async (req, res) => {
  try {
    const { name, address, contactNumber } = req.body;

    // 1. Create the gym and assign the logged-in user as the owner
    const gym = await Gym.create({
      name,
      address,
      contactNumber,
      owner: req.user._id,
    });

    // 2. Update the user document to reference this new gym
    await User.findByIdAndUpdate(req.user._id, { gymId: gym._id });

    res.status(201).json({ success: true, data: gym });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get the logged-in owner's gym
// @route   GET /api/gyms/my-gym
export const getMyGym = async (req, res) => {
  try {
    const gym = await Gym.findOne({ owner: req.user._id });

    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res.status(200).json({ success: true, data: gym });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update gym details
// @route   PUT /api/gyms/my-gym
export const updateGym = async (req, res) => {
  try {
    const gym = await Gym.findOneAndUpdate(
      { owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!gym) {
      return res.status(404).json({ success: false, message: "Gym not found" });
    }

    res.status(200).json({ success: true, data: gym });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};