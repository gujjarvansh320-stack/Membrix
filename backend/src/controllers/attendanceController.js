// import Attendance from '../models/Attendance.js';
// import Member from '../models/Member.js';

// export const logPunch = async (req, res) => {
//   try {
//     const { gymId, biometricId, punchTime } = req.body;

//     if (!gymId || !biometricId) {
//       return res.status(400).json({ success: false, message: 'Missing hardware payload' });
//     }

//     // 1. Find who this fingerprint belongs to
//     const member = await Member.findOne({ gymId, biometricId });
    
//     if (!member) {
//       return res.status(404).json({ success: false, message: 'Unregistered fingerprint ID' });
//     }

//     // 2. Check if they are locked out
//     if (member.biometricStatus === 'locked') {
//       return res.status(403).json({ success: false, message: 'Member is expired/locked' });
//     }

//     // 3. Save the punch to the database
//     const attendance = await Attendance.create({
//       gymId,
//       memberId: member._id,
//       biometricId,
//       punchTime: punchTime ? new Date(punchTime) : new Date()
//     });

//     res.status(201).json({ success: true, message: 'Punch logged', memberName: member.name });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error logging punch', error: error.message });
//   }
// };








import Attendance from '../models/Attendance.js';
import Member from '../models/Member.js';

export const logPunch = async (req, res) => {
  try {
    const { gymId, biometricId, punchTime } = req.body;

    if (!gymId || !biometricId) {
      return res.status(400).json({ success: false, message: 'Missing hardware payload' });
    }

    // 1. Find who this fingerprint belongs to
    const member = await Member.findOne({ gymId, biometricId });
    
    if (!member) {
      return res.status(404).json({ success: false, message: 'Unregistered fingerprint ID' });
    }

    // 2. Check if they are locked out
    if (member.biometricStatus === 'locked') {
      return res.status(403).json({ success: false, message: 'Member is expired/locked' });
    }

    // 3. Save the punch to the database
    const attendance = await Attendance.create({
      gymId,
      memberId: member._id,
      biometricId,
      punchTime: punchTime ? new Date(punchTime) : new Date()
    });

    res.status(201).json({ success: true, message: 'Punch logged', memberName: member.name });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error logging punch', error: error.message });
  }
};

export const getAttendanceLogs = async (req, res) => {
  try {
    const { gymId, date } = req.query;
    
    // Default to today if no date is provided
    const queryDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

    const logs = await Attendance.find({ 
      gymId, 
      punchTime: { $gte: startOfDay, $lte: endOfDay } 
    })
    .populate('memberId', 'name mobile photoUrl planName expiryDate')
    .sort({ punchTime: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};