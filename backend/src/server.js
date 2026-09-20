// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js'; 
// import userRoutes from './routes/userRoutes.js';
// import gymRoutes from './routes/gymRoutes.js';
// import memberRoutes from './routes/memberRoutes.js'; 
// import cors from 'cors'; 
// import planRoutes from './routes/planRoutes.js'; // NEW
// import enquiryRoutes from './routes/enquiryRoutes.js';
// import couponRoutes from './routes/couponRoutes.js';

// // 🚀 1. IMPORT THE NEW BIOMETRIC & CRON FILES
// import attendanceRoutes from './routes/attendanceRoutes.js';
// import { startCronJobs } from './utils/cronJobs.js';

// dotenv.config();

// const app = express();

// // 1. ALL MIDDLEWARE MUST COME FIRST!
// app.use(cors());

// // Middleware to parse JSON bodies
// app.use(express.json());

// // 2. MOUNT ALL ROUTES AFTER MIDDLEWARE
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/gyms', gymRoutes);
// app.use('/api/members', memberRoutes); 
// app.use('/api/plans', planRoutes); // MOVED HERE!
// app.use('/api/enquiries', enquiryRoutes);
// app.use('/api/coupons', couponRoutes);

// // 🚀 2. MOUNT THE BIOMETRIC ATTENDANCE ROUTE
// app.use('/api/attendance', attendanceRoutes);

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Gym SaaS API is running',
//   });
// });

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   await connectDB();

//   // 🚀 3. START THE NIGHTLY LOCKOUT TIMER
//   startCronJobs();

//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// };

// startServer();




import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js';
import gymRoutes from './routes/gymRoutes.js';
import memberRoutes from './routes/memberRoutes.js'; 
import planRoutes from './routes/planRoutes.js'; 
import enquiryRoutes from './routes/enquiryRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import cors from 'cors'; 

// 🚀 1. IMPORT THE NEW BIOMETRIC & CRON FILES
import attendanceRoutes from './routes/attendanceRoutes.js';
import { startCronJobs } from './utils/cronJobs.js'; 

dotenv.config();

const app = express();

// 1. ALL MIDDLEWARE MUST COME FIRST!
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// 2. MOUNT ALL ROUTES AFTER MIDDLEWARE
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gyms', gymRoutes);
app.use('/api/members', memberRoutes); 
app.use('/api/plans', planRoutes); 
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/coupons', couponRoutes);

// 🚀 2. MOUNT THE BIOMETRIC ATTENDANCE ROUTE
app.use('/api/attendance', attendanceRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Gym SaaS API is running',
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // 🚀 3. START THE NIGHTLY LOCKOUT TIMER
  startCronJobs();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();