// backend/src/controllers/enquiryController.js
import Enquiry from '../models/Enquiry.js';
import Member from '../models/Member.js';
import Payment from '../models/Payment.js';

// 1. Get all enquiries for a gym
export const getEnquiries = async (req, res) => {
  try {
    const { gymId, status, search } = req.query;
    let query = { gymId };

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
  }
};

// 2. Create a new enquiry
export const createEnquiry = async (req, res) => {
  try {
    const { gymId, name, mobile, email, goal, status, trialDate, notes } = req.body;
    
    const newEnquiry = await Enquiry.create({
      gymId,
      name,
      mobile,
      email,
      goal,
      status: status || 'Pending',
      trialDate: trialDate ? new Date(trialDate) : null,
      notes
    });

    res.status(201).json(newEnquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ message: 'Error creating enquiry', error: error.message });
  }
};

// 3. Update enquiry status or notes
export const updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Enquiry.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating enquiry:", error);
    res.status(500).json({ message: 'Error updating enquiry', error: error.message });
  }
};

// 4. Delete enquiry
export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    res.status(500).json({ message: 'Error deleting enquiry', error: error.message });
  }
};

// 5. Convert Enquiry to Active Member
export const convertEnquiryToMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { expiryDate, amountPaid } = req.body;

    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    // Create Member record
    const newMember = await Member.create({
      gymId: enquiry.gymId,
      name: enquiry.name,
      mobile: enquiry.mobile,
      email: enquiry.email || '',
      expiryDate: new Date(expiryDate),
      photoUrl: '' // Can be updated later
    });

    // Record initial payment
    if (amountPaid && Number(amountPaid) > 0) {
      await Payment.create({
        gymId: enquiry.gymId,
        memberId: newMember._id,
        amount: Number(amountPaid),
        paymentType: 'Registration'
      });
    }

    // Update enquiry status to Converted
    enquiry.status = 'Converted';
    await enquiry.save();

    res.status(200).json({ message: 'Converted to member successfully', newMember });
  } catch (error) {
    console.error("Error converting enquiry:", error);
    res.status(500).json({ message: 'Error converting enquiry', error: error.message });
  }
};