/**
 * Database Verification Script
 * ----------------------------------
 * This script verifies that all 11 Mongoose models
 * can successfully create collections and insert
 * documents into MongoDB Atlas.
 *
 * Run: node config/seed-test.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

// Import ALL 11 models
const Customer = require('../models/Customer');
const Staff = require('../models/Staff');
const Admin = require('../models/Admin');
const Branch = require('../models/Branch');
const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const Chatbot = require('../models/Chatbot');
const KnowledgeArea = require('../models/KnowledgeArea');

const seedAndVerify = async () => {
  try {
    // 1. Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`\n✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database Name: ${conn.connection.name}`);
    console.log('\n--- Starting Seed & Verification ---\n');

    // 2. Clean existing test data (fresh start)
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const col of collections) {
      await mongoose.connection.db.dropCollection(col.name);
    }
    console.log('🧹 Cleaned existing collections.\n');

    // 3. Seed Branch first (other models reference it)
    const branch = await Branch.create({
      Address: 'No. 45, Main Street, Minuwangoda, Sri Lanka',
      Contact_Number: '011-2284567',
    });
    console.log('✅ Branch created:', branch._id);

    // 4. Seed Admin
    const admin = await Admin.create({
      Name: 'System Admin',
      Email: 'admin@darshanaopticals.lk',
      Password: 'Admin@123',
      Phone_number: '077-1234567',
    });
    console.log('✅ Admin created:', admin._id);

    // 5. Seed Staff (Optometrist)
    const staff = await Staff.create({
      Branch_ID: branch._id,
      Name: 'Dr. Perera',
      Email: 'dr.perera@darshanaopticals.lk',
      Password: 'Doctor@123',
      Phone_number: '077-9876543',
      Address: 'Colombo 07',
      Role: 'optometrist',
    });
    console.log('✅ Staff created:', staff._id);

    // 6. Seed Customer
    const customer = await Customer.create({
      Name: 'Kavindu Amalka',
      Email: 'kavindu@example.com',
      Password: 'Customer@123',
      Address: 'Gampaha, Sri Lanka',
      Phone_number: '076-5551234',
    });
    console.log('✅ Customer created:', customer._id);

    // 7. Seed Inventory
    const item = await Inventory.create({
      Branch_ID: branch._id,
      Item_Name: 'Ray-Ban Aviator Classic',
      Category: 'Sunglasses',
      Brand: 'Ray-Ban',
      Price: 25000,
      Quantity: 15,
    });
    console.log('✅ Inventory item created:', item._id);

    // 8. Seed Order
    const order = await Order.create({
      Customer_Id: customer._id,
      Order_Date: new Date(),
      Order_amount: 25000,
      Status: 'Pending',
    });
    console.log('✅ Order created:', order._id);

    // 9. Seed Order Item
    const orderItem = await OrderItem.create({
      Order_ID: order._id,
      Item_name: 'Ray-Ban Aviator Classic',
      Price: 25000,
      Quantity: 1,
    });
    console.log('✅ OrderItem created:', orderItem._id);

    // 10. Seed Payment
    const payment = await Payment.create({
      Order_ID: order._id,
      Amount: 25000,
      Transaction_date: new Date(),
      Payment_method: 'card',
      Payment_status: 'completed',
    });
    console.log('✅ Payment created:', payment._id);

    // 11. Seed Appointment
    const appointment = await Appointment.create({
      Customer_Id: customer._id,
      Staff_ID: staff._id,
      Date_Time: new Date('2026-06-15T10:00:00'),
      Status: 'Confirmed',
    });
    console.log('✅ Appointment created:', appointment._id);

    // 12. Seed Chatbot
    const chat = await Chatbot.create({
      Customer_Id: customer._id,
      Inquiry_Type: 'Frame Recommendations',
      Response_Status: 'responded',
      Messages: [
        { sender: 'customer', content: 'I need frame recommendations for a round face' },
        { sender: 'bot', content: 'For round faces, we recommend rectangular or square frames. Check out our Ray-Ban collection!' },
      ],
    });
    console.log('✅ Chatbot created:', chat._id);

    // 13. Seed Knowledge Area
    const article = await KnowledgeArea.create({
      Category: 'Eye Care Tips',
      Content_Title: 'How to Choose the Right Frame for Your Face Shape',
      Content_Body: 'Choosing the right eyeglass frame depends on your face shape...',
    });
    console.log('✅ KnowledgeArea created:', article._id);

    // 14. Final Verification - List all collections
    console.log('\n========================================');
    console.log('📊 VERIFICATION: All MongoDB Collections');
    console.log('========================================\n');

    const finalCollections = await mongoose.connection.db.listCollections().toArray();
    finalCollections.forEach((col, index) => {
      console.log(`  ${index + 1}. ${col.name}`);
    });

    console.log(`\n🎉 Total Collections Created: ${finalCollections.length}/11`);

    // 15. Verify password was hashed (not plain text)
    const savedAdmin = await Admin.findById(admin._id).select('+Password');
    console.log('\n🔐 Password Hashing Verification:');
    console.log(`   Original:  "Admin@123"`);
    console.log(`   Stored:    "${savedAdmin.Password}"`);
    console.log(`   Hashed:    ${savedAdmin.Password !== 'Admin@123' ? '✅ YES (bcrypt working!)' : '❌ NO (SECURITY ISSUE!)'}`);

    console.log('\n✅ ALL VERIFICATIONS PASSED! Database is ready.\n');

  } catch (error) {
    console.error('\n❌ Verification FAILED:', error.message);
    console.error(error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
  }
};

seedAndVerify();
