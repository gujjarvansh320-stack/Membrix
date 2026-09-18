// // backend/src/models/Payment.js
// import mongoose from 'mongoose';

// const paymentSchema = new mongoose.Schema({
//   gymId: {
//     type: String,
//     required: true,
//   },
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Member', // This links the payment directly to the member's profile
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   // ✅ ADDED: Track discount amount deducted
//   discountAmount: { 
//     type: Number, 
//     default: 0 
//   },
//   paymentType: {
//     type: String,
//     enum: ['Registration', 'Renewal' , 'Transfer Fee'], 
//     required: true,
//   },
//   paymentDate: {
//     type: Date,
//     default: Date.now,
//   },
//   couponCode: {
//     type: String,
//     default: ''
//   },
//   planName: {
//     type: String,
//     default: 'Custom Plan'
//   },
//   pendingBalance: {
//     type: Number,
//     default: 0
//   },
//   pendingDueDate: {
//     type: Date,
//     default: null
//   },
//   paymentMode: { 
//     type: String, 
//     enum: ['Cash', 'UPI', 'Card', 'Net Banking'], 
//     default: 'Cash' 
//   },
// }, { timestamps: true });

// const Payment = mongoose.model('Payment', paymentSchema);

// export default Payment;







// backend/src/models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  gymId: {
    type: String,
    required: true,
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member', // Links the payment directly to the member's profile
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  discountAmount: { 
    type: Number, 
    default: 0 
  },
  paymentType: {
    type: String,
    enum: ['Registration', 'Renewal', 'Transfer Fee', 'Due Clearance'], // ✅ Added 'Due Clearance' to fix validation errors
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  couponCode: {
    type: String,
    default: ''
  },
  planName: {
    type: String,
    default: 'Custom Plan'
  },
  pendingBalance: {
    type: Number,
    default: 0
  },
  pendingDueDate: {
    type: Date,
    default: null
  },
  paymentMode: { 
    type: String, 
    enum: ['Cash', 'UPI', 'Card', 'Net Banking'], 
    default: 'Cash' 
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;