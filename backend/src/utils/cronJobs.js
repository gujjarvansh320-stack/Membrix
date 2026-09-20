import cron from 'node-cron';
import Member from '../models/Member.js';

export const startCronJobs = () => {
  // Runs every night at 12:01 AM
  cron.schedule('1 0 * * *', async () => {
    try {
      const today = new Date();
      
      // Find members who expired and flag them to be disabled on the hardware
      const result = await Member.updateMany(
        { 
          expiryDate: { $lt: today }, 
          biometricStatus: 'active' 
        },
        { 
          $set: { 
            biometricStatus: 'locked', 
            biometricSyncAction: 'disable' 
          } 
        }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`[Cron] Flagged ${result.modifiedCount} expired members for biometric lockout.`);
      }
    } catch (error) {
      console.error('[Cron] Error running daily expiry check:', error);
    }
  });
};