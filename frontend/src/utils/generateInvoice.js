// // src/utils/generateInvoice.js
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import api from '../api/axios'; 

// // Helper function to fetch the Cloudinary logo and convert it so jsPDF can read it
// const getBase64ImageFromUrl = async (imageUrl) => {
//   try {
//     const res = await fetch(imageUrl);
//     const blob = await res.blob();
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     });
//   } catch (err) {
//     console.error("Failed to load image for PDF", err);
//     return null;
//   }
// };

// export const generateInvoice = async (member, payment, fallbackGymName) => {
//   const doc = new jsPDF('p', 'mm', 'a4');
//   let startY = 15;

//   // 1. BULLETPROOF DYNAMIC GYM DATA EXTRACTION
//   const storedAuth = JSON.parse(localStorage.getItem('user')) || {};
//   // Deep search checks root, .data, and .user to guarantee data is found
//   const userData = storedAuth.data || storedAuth.user || storedAuth;
  
//   const gymName = userData.gymName || storedAuth.gymName || fallbackGymName || 'GYM FITNESS';
//   const gymAddress = userData.address || storedAuth.address || '';
//   const gymPhone = userData.phone || storedAuth.phone || userData.mobile || storedAuth.mobile || '';
//   const gymEmail = userData.email || storedAuth.email || '';

//   // TOP HEADER BANNER (Dark Grey Rectangle)
//   doc.setFillColor(75, 75, 75);
//   doc.rect(14, startY, 182, 12, 'F');
  
//   doc.setTextColor(255, 255, 255);
//   doc.setFontSize(14);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Tax Invoice', 105, startY + 8, { align: 'center' });
//   startY += 25;

//   // 2. LOGO & INVOICE DETAILS
//   if (userData.gymLogo || storedAuth.gymLogo) {
//     const logoUrl = userData.gymLogo || storedAuth.gymLogo;
//     const base64Img = await getBase64ImageFromUrl(logoUrl);
//     if (base64Img) {
//       doc.addImage(base64Img, 'JPEG', 14, startY - 5, 25, 25, undefined, 'FAST');
//     }
//   }

//   const textX = (userData.gymLogo || storedAuth.gymLogo) ? 45 : 14;

//   doc.setTextColor(230, 100, 30); 
//   doc.setFontSize(16);
//   doc.text(gymName.toUpperCase(), textX, startY + 5);
  
//   doc.setTextColor(50, 50, 50);
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'normal');
  
//   const invoiceNo = `INV/${new Date(payment.paymentDate || Date.now()).getFullYear()}/${payment._id?.toString().slice(-5).toUpperCase() || '001'}`;
//   const invoiceDate = payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  
//   doc.setFont('helvetica', 'bold');
//   doc.text(`Invoice ID:`, 140, startY - 4);
//   doc.setFont('helvetica', 'normal');
//   doc.text(invoiceNo, 160, startY - 4);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text(`Invoice Date:`, 140, startY + 1);
//   doc.setFont('helvetica', 'normal');
//   doc.text(invoiceDate, 165, startY + 1);
  
//   startY += 25; 

//   // 3. GREETING
//   doc.setFontSize(10);
//   doc.setTextColor(0, 0, 0);
//   doc.setFont('helvetica', 'bold');
//   doc.text(`Hi ${member?.name || 'Member'},`, 14, startY);
//   doc.setFont('helvetica', 'normal');
//   doc.text('Thank you for your purchase. Here is an overview of your recent transaction:', 14, startY + 5);
//   startY += 15;

//   // 4. BILLING FROM & BILLING TO
//   doc.setFont('helvetica', 'bold');
//   doc.text('Billing From', 14, startY);
//   doc.text('Billing To', 140, startY);
//   startY += 5;

//   // Gym Info (Left Column)
//   let leftY = startY;
//   doc.setFont('helvetica', 'bold');
//   doc.text(gymName.toUpperCase(), 14, leftY);
//   leftY += 5;
  
//   doc.setFont('helvetica', 'normal');
//   if (gymAddress) { 
//     doc.text(`Address: ${gymAddress}`, 14, leftY); 
//     leftY += 5; 
//   }
//   if (gymPhone) { 
//     doc.text(`Phone: ${gymPhone}`, 14, leftY); 
//     leftY += 5; 
//   }
//   if (gymEmail) { 
//     doc.text(`Email: ${gymEmail}`, 14, leftY); 
//     leftY += 5; 
//   }

//   // Member Info (Right Column)
//   let rightY = startY;
//   doc.setFont('helvetica', 'bold');
//   doc.text(member?.name || 'Unknown', 140, rightY);
//   rightY += 5;
  
//   doc.setFont('helvetica', 'normal');
//   if (member?.mobile) { 
//     doc.setFont('helvetica', 'bold');
//     doc.text('Mobile:', 140, rightY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(member.mobile, 155, rightY); 
//     rightY += 5; 
//   }
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Email:', 140, rightY);
//   doc.setFont('helvetica', 'normal');
//   doc.text(member?.email || 'Not Provided', 152, rightY); 
//   rightY += 5; 

//   startY = Math.max(leftY, rightY) + 10;

//   // 5. ITEM TABLE (Plans)
//   const expiryStr = member?.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-GB') : '-';
//   const planName = payment.planName || member?.planName || 'Custom Plan';
  
//   const finalPaidAmount = Number(payment.amount) || 0;
//   let discountAmount = Number(payment.discountAmount) || 0; 
//   const pendingBal = Number(payment.pendingBalance) || 0;
  
//   if (payment.couponCode && discountAmount === 0) {
//     try {
//       const currentGymId = userData._id || userData.id || storedAuth._id || '65abc123def4567890abcd12';
//       const res = await api.post('/coupons/validate', { gymId: currentGymId, code: payment.couponCode });
//       const coupon = res.data.data;
      
//       if (coupon.discountType === 'percentage') {
//         const basePrice = finalPaidAmount / (1 - (coupon.discountValue / 100));
//         discountAmount = basePrice - finalPaidAmount;
//       } else {
//         discountAmount = Number(coupon.discountValue);
//       }
//     } catch (err) {
//       console.warn("Could not calculate past discount.", err);
//     }
//   }

//   const baseAmount = finalPaidAmount + discountAmount + pendingBal;
//   const payableAmount = finalPaidAmount + pendingBal;

//   autoTable(doc, {
//     startY: startY,
//     head: [['#', 'Plan Name', 'Type', 'Start Date', 'End Date', 'Base Price']],
//     body: [
//       [
//         payment._id?.toString().slice(-6).toUpperCase() || '123456',
//         planName,
//         payment.paymentType || 'Registration',
//         invoiceDate,
//         expiryStr,
//         `Rs. ${baseAmount.toFixed(2)}`
//       ],
//     ],
//     theme: 'grid',
//     headStyles: { fillColor: [85, 85, 85], textColor: 255, halign: 'center', fontSize: 8 },
//     bodyStyles: { halign: 'center', fontSize: 9 },
//   });

//   let currentY = doc.lastAutoTable.finalY + 10;

//   // 6. TOTALS BREAKDOWN
//   doc.setFontSize(9);
//   doc.setFont('helvetica', 'bold');
//   doc.text(`Sub Total: Rs. ${baseAmount.toFixed(2)}`, 14, currentY);
//   currentY += 8;

//   doc.setFont('helvetica', 'bold');
//   doc.text('SGST (0%):', 14, currentY);
//   doc.setFont('helvetica', 'normal');
//   doc.text('Rs. 0.00', 40, currentY);
  
//   doc.setFont('helvetica', 'bold');
//   doc.text('Base Amount:', 110, currentY);
//   doc.setFont('helvetica', 'normal');
//   doc.text(`Rs. ${baseAmount.toFixed(2)}`, 150, currentY);
//   currentY += 8;

//   doc.setFont('helvetica', 'bold');
//   doc.text('CGST (0%):', 14, currentY);
//   doc.setFont('helvetica', 'normal');
//   doc.text('Rs. 0.00', 40, currentY);

//   doc.setFont('helvetica', 'bold');
//   if (payment.couponCode) {
//     doc.setTextColor(34, 139, 34);
//     doc.text(`Discount (${payment.couponCode}):`, 110, currentY);
//     doc.text(`- Rs. ${discountAmount.toFixed(2)}`, 150, currentY);
//   } else {
//     doc.text('Discount:', 110, currentY);
//     doc.setFont('helvetica', 'normal');
//     doc.text(`Rs. 0.00`, 150, currentY);
//   }
//   doc.setTextColor(0, 0, 0); 
//   currentY += 8;

//   doc.setFont('helvetica', 'bold');
//   doc.text('Payable Amount:', 110, currentY);
//   doc.setFont('helvetica', 'normal');
//   doc.text(`Rs. ${payableAmount.toFixed(2)}`, 150, currentY);
//   currentY += 8;

//   doc.setFont('helvetica', 'bold');
//   doc.text('Amount Paid:', 110, currentY);
//   doc.setFont('helvetica', 'bold');
//   doc.text(`Rs. ${finalPaidAmount.toFixed(2)}`, 150, currentY);
//   currentY += 8;

//   doc.setFont('helvetica', 'bold');
//   if (pendingBal > 0) {
//     doc.setTextColor(220, 38, 38);
//     doc.text('Remaining Due Balance:', 110, currentY);
//     doc.text(`Rs. ${pendingBal.toFixed(2)}`, 150, currentY);
    
//     const dueDate = payment.pendingDueDate || member?.pendingDueDate;
//     if (dueDate) {
//       currentY += 6;
//       doc.setFontSize(8);
//       doc.text('Clear Dues By:', 110, currentY);
//       doc.text(new Date(dueDate).toLocaleDateString('en-GB'), 150, currentY);
//       doc.setFontSize(9);
//     }
    
//     doc.setTextColor(0, 0, 0);
//   } else {
//     doc.text('Balance Amount:', 110, currentY);
//     doc.setFont('helvetica', 'normal');
//     doc.text('Rs. 0.00', 150, currentY);
//   }
//   currentY += 15;

//   // 7. PAYMENT LOG TABLE
//   doc.setFontSize(10);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Payment Log', 14, currentY - 2);
  
//   autoTable(doc, {
//     startY: currentY,
//     head: [['#', 'Payment Date', 'Amount Paid', 'Payment Mode', 'Invoice/Receipt No.', 'Received By']],
//     body: [
//       [
//         payment._id?.toString().slice(-7).toUpperCase() || '1415601',
//         invoiceDate,
//         `Rs. ${finalPaidAmount.toFixed(2)}`,
//         payment.paymentMode || 'Cash',
//         invoiceNo,
//         userData.name || storedAuth.name || 'Admin'
//       ],
//     ],
//     theme: 'grid',
//     headStyles: { fillColor: [85, 85, 85], textColor: 255, halign: 'center', fontSize: 8 },
//     bodyStyles: { halign: 'center', fontSize: 9 },
//   });

//   currentY = doc.lastAutoTable.finalY + 15;

//   // 8. TERMS & CONDITIONS
//   doc.setFontSize(7);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Terms & Conditions:', 14, currentY);
//   doc.setFont('helvetica', 'normal');
  
//   const defaultTerms = `1. WORKING HOURS - Fitness centre will be open from 5AM to 10PM from Monday to Saturday and from 7AM to 7PM on Sundays. 2. YOUR VALUABLES - Fitness centre does not hold any responsibility for theft and loss of any valuables. 3. ATTIRE - Appropriate covered footwear and workout wear must be worn at all times while in the fitness centre. We request you to carry a seperate pair of shoes to workout in the fitness centre. 4. OFFERS - The prices and offer are subject to change without prior notice at anytime. 5. MEMBERSHIP CANCELLATION & TRANSFER - No refunds will be given in the event of membership cancellation.`;
  
//   // ✅ Bulletproof fallback checks all locations for custom terms
//   const termsText = userData.termsAndConditions || storedAuth.termsAndConditions || defaultTerms;

//   const splitTerms = doc.splitTextToSize(termsText, 182);
//   doc.text(splitTerms, 14, currentY + 4);

//   // 9. DOWNLOAD
//   doc.save(`${member?.name || 'Client'}_Tax_Invoice.pdf`);
// };











// src/utils/generateInvoice.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import api from '../api/axios'; 

// Helper function to fetch the Cloudinary logo and convert it so jsPDF can read it
const getBase64ImageFromUrl = async (imageUrl) => {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Failed to load image for PDF", err);
    return null;
  }
};

export const generateInvoice = async (member, payment, fallbackGymName) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let startY = 15;

  // 1. BULLETPROOF DYNAMIC GYM DATA EXTRACTION
  const storedAuth = JSON.parse(localStorage.getItem('user')) || {};
  // Deep search checks root, .data, and .user to guarantee data is found
  const userData = storedAuth.data || storedAuth.user || storedAuth;
  
  const gymName = userData.gymName || storedAuth.gymName || fallbackGymName || 'GYM FITNESS';
  const gymAddress = userData.address || storedAuth.address || '';
  const gymPhone = userData.phone || storedAuth.phone || userData.mobile || storedAuth.mobile || '';
  const gymEmail = userData.email || storedAuth.email || '';

  // TOP HEADER BANNER (Dark Grey Rectangle)
  doc.setFillColor(75, 75, 75);
  doc.rect(14, startY, 182, 12, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Tax Invoice', 105, startY + 8, { align: 'center' });
  startY += 25;

  // 2. LOGO & INVOICE DETAILS
  if (userData.gymLogo || storedAuth.gymLogo) {
    const logoUrl = userData.gymLogo || storedAuth.gymLogo;
    const base64Img = await getBase64ImageFromUrl(logoUrl);
    if (base64Img) {
      doc.addImage(base64Img, 'JPEG', 14, startY - 5, 25, 25, undefined, 'FAST');
    }
  }

  const textX = (userData.gymLogo || storedAuth.gymLogo) ? 45 : 14;

  doc.setTextColor(230, 100, 30); 
  doc.setFontSize(16);
  doc.text(gymName.toUpperCase(), textX, startY + 5);
  
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const invoiceNo = `INV/${new Date(payment.paymentDate || Date.now()).getFullYear()}/${payment._id?.toString().slice(-5).toUpperCase() || '001'}`;
  const invoiceDate = payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice ID:`, 140, startY - 4);
  doc.setFont('helvetica', 'normal');
  doc.text(invoiceNo, 160, startY - 4);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Invoice Date:`, 140, startY + 1);
  doc.setFont('helvetica', 'normal');
  doc.text(invoiceDate, 165, startY + 1);
  
  startY += 25; 

  // 3. GREETING
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(`Hi ${member?.name || 'Member'},`, 14, startY);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for your purchase. Here is an overview of your recent transaction:', 14, startY + 5);
  startY += 15;

  // 4. BILLING FROM & BILLING TO
  doc.setFont('helvetica', 'bold');
  doc.text('Billing From', 14, startY);
  doc.text('Billing To', 140, startY);
  startY += 5;

  // Gym Info (Left Column)
  let leftY = startY;
  doc.setFont('helvetica', 'bold');
  doc.text(gymName.toUpperCase(), 14, leftY);
  leftY += 5;
  
  doc.setFont('helvetica', 'normal');
  if (gymAddress) { 
    doc.text(`Address: ${gymAddress}`, 14, leftY); 
    leftY += 5; 
  }
  if (gymPhone) { 
    doc.text(`Phone: ${gymPhone}`, 14, leftY); 
    leftY += 5; 
  }
  if (gymEmail) { 
    doc.text(`Email: ${gymEmail}`, 14, leftY); 
    leftY += 5; 
  }

  // Member Info (Right Column)
  let rightY = startY;
  doc.setFont('helvetica', 'bold');
  doc.text(member?.name || 'Unknown', 140, rightY);
  rightY += 5;
  
  doc.setFont('helvetica', 'normal');
  if (member?.mobile) { 
    doc.setFont('helvetica', 'bold');
    doc.text('Mobile:', 140, rightY);
    doc.setFont('helvetica', 'normal');
    doc.text(member.mobile, 155, rightY); 
    rightY += 5; 
  }
  
  doc.setFont('helvetica', 'bold');
  doc.text('Email:', 140, rightY);
  doc.setFont('helvetica', 'normal');
  doc.text(member?.email || 'Not Provided', 152, rightY); 
  rightY += 5; 

  startY = Math.max(leftY, rightY) + 10;

  // 5. ITEM TABLE (Plans)
  const expiryStr = member?.expiryDate ? new Date(member.expiryDate).toLocaleDateString('en-GB') : '-';
  const planName = payment.planName || member?.planName || 'Custom Plan';
  
  const finalPaidAmount = Number(payment.amount) || 0;
  let discountAmount = Number(payment.discountAmount) || 0; 
  const pendingBal = Number(payment.pendingBalance) || 0;
  
  if (payment.couponCode && discountAmount === 0) {
    try {
      const currentGymId = userData._id || userData.id || storedAuth._id || '65abc123def4567890abcd12';
      const res = await api.post('/coupons/validate', { gymId: currentGymId, code: payment.couponCode });
      const coupon = res.data.data;
      
      if (coupon.discountType === 'percentage') {
        const basePrice = finalPaidAmount / (1 - (coupon.discountValue / 100));
        discountAmount = basePrice - finalPaidAmount;
      } else {
        discountAmount = Number(coupon.discountValue);
      }
    } catch (err) {
      console.warn("Could not calculate past discount.", err);
    }
  }

  const baseAmount = finalPaidAmount + discountAmount + pendingBal;
  const payableAmount = finalPaidAmount + pendingBal;

  autoTable(doc, {
    startY: startY,
    head: [['#', 'Plan Name', 'Type', 'Start Date', 'End Date', 'Base Price']],
    body: [
      [
        payment._id?.toString().slice(-6).toUpperCase() || '123456',
        planName,
        payment.paymentType || 'Registration',
        invoiceDate,
        expiryStr,
        `Rs. ${baseAmount.toFixed(2)}`
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [85, 85, 85], textColor: 255, halign: 'center', fontSize: 8 },
    bodyStyles: { halign: 'center', fontSize: 9 },
  });

  let currentY = doc.lastAutoTable.finalY + 10;

  // 6. TOTALS BREAKDOWN
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`Sub Total: Rs. ${baseAmount.toFixed(2)}`, 14, currentY);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Base Amount:', 110, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`Rs. ${baseAmount.toFixed(2)}`, 150, currentY);
  currentY += 8;

  doc.setFont('helvetica', 'bold');
  if (payment.couponCode) {
    doc.setTextColor(34, 139, 34);
    doc.text(`Discount (${payment.couponCode}):`, 110, currentY);
    doc.text(`- Rs. ${discountAmount.toFixed(2)}`, 150, currentY);
  } else {
    doc.text('Discount:', 110, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rs. 0.00`, 150, currentY);
  }
  doc.setTextColor(0, 0, 0); 
  currentY += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Payable Amount:', 110, currentY);
  doc.setFont('helvetica', 'normal');
  doc.text(`Rs. ${payableAmount.toFixed(2)}`, 150, currentY);
  currentY += 8;

  doc.setFont('helvetica', 'bold');
  doc.text('Amount Paid:', 110, currentY);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs. ${finalPaidAmount.toFixed(2)}`, 150, currentY);
  currentY += 8;

  doc.setFont('helvetica', 'bold');
  if (pendingBal > 0) {
    doc.setTextColor(220, 38, 38);
    doc.text('Remaining Due Balance:', 110, currentY);
    doc.text(`Rs. ${pendingBal.toFixed(2)}`, 150, currentY);
    
    const dueDate = payment.pendingDueDate || member?.pendingDueDate;
    if (dueDate) {
      currentY += 6;
      doc.setFontSize(8);
      doc.text('Clear Dues By:', 110, currentY);
      doc.text(new Date(dueDate).toLocaleDateString('en-GB'), 150, currentY);
      doc.setFontSize(9);
    }
    
    doc.setTextColor(0, 0, 0);
  } else {
    doc.text('Balance Amount:', 110, currentY);
    doc.setFont('helvetica', 'normal');
    doc.text('Rs. 0.00', 150, currentY);
  }
  currentY += 15;

  // 7. PAYMENT LOG TABLE
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Log', 14, currentY - 2);
  
  autoTable(doc, {
    startY: currentY,
    head: [['#', 'Payment Date', 'Amount Paid', 'Payment Mode', 'Invoice/Receipt No.', 'Received By']],
    body: [
      [
        payment._id?.toString().slice(-7).toUpperCase() || '1415601',
        invoiceDate,
        `Rs. ${finalPaidAmount.toFixed(2)}`,
        payment.paymentMode || 'Cash',
        invoiceNo,
        member?.name || 'Client' // ✅ Changed to show the client's name
      ],
    ],
    theme: 'grid',
    headStyles: { fillColor: [85, 85, 85], textColor: 255, halign: 'center', fontSize: 8 },
    bodyStyles: { halign: 'center', fontSize: 9 },
  });

  currentY = doc.lastAutoTable.finalY + 15;

  // 8. TERMS & CONDITIONS
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions:', 14, currentY);
  doc.setFont('helvetica', 'normal');
  
  const defaultTerms = `1. WORKING HOURS - Fitness centre will be open from 5AM to 10PM from Monday to Saturday and from 7AM to 7PM on Sundays. 2. YOUR VALUABLES - Fitness centre does not hold any responsibility for theft and loss of any valuables. 3. ATTIRE - Appropriate covered footwear and workout wear must be worn at all times while in the fitness centre. We request you to carry a seperate pair of shoes to workout in the fitness centre. 4. OFFERS - The prices and offer are subject to change without prior notice at anytime. 5. MEMBERSHIP CANCELLATION & TRANSFER - No refunds will be given in the event of membership cancellation.`;
  
  const termsText = userData.termsAndConditions || storedAuth.termsAndConditions || defaultTerms;

  const splitTerms = doc.splitTextToSize(termsText, 182);
  doc.text(splitTerms, 14, currentY + 4);

  // 9. DOWNLOAD
  doc.save(`${member?.name || 'Client'}_Tax_Invoice.pdf`);
};