import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import productModel from '../models/product.js';
import axios from 'axios';
import User from '../models/users.js';

const API_BASE = process.env.API_BASE || 'http://localhost:5000';

const run = async () => {
  try {
    await connectDB();

    // 1) Create a test product directly via model (idempotent by name)
    const productData = {
      name: `Smoke Test Product ${Date.now()}`,
      image: ['https://via.placeholder.com/300'],
      old_price: 100,
      new_price: 49.99,
      category: 'tests',
      description: 'A product created for smoke testing',
      size: ['S','M','L']
    };

    const product = await productModel.create(productData);
    console.log('Created product:', product._id.toString());

    // 2) Register a new user via API
    const email = `smoketest+${Date.now()}@example.com`;
    const password = 'Smoke1234';

    const regResp = await axios.post(`${API_BASE}/api/auth/register`, {
      name: 'Smoke Tester',
      email,
      password,
      address: '1 Test Lane',
      phone: '1234567890'
    });

    if (!regResp.data || !regResp.data.token) throw new Error('Registration failed');
    const token = regResp.data.token;
    console.log('Registered user, token acquired');

    // 3) Add product to cart
    const addResp = await axios.post(`${API_BASE}/api/cart/add`, {
      productId: product._id.toString(),
      size: 'M'
    }, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Add response:', JSON.stringify(addResp.data, null, 2));

    // Small delay to ensure DB write visibility
    await new Promise(r => setTimeout(r, 200));

    // Check cart via API
    const cartResp = await axios.get(`${API_BASE}/api/cart/get`, { headers: { Authorization: `Bearer ${token}` } });
    console.log('Cart contents:', JSON.stringify(cartResp.data, null, 2));

    // 4) Place order
    const orderResp = await axios.post(`${API_BASE}/api/orders`, {
      shippingAddress: {
        fullName: 'Smoke Tester',
        address: '1 Test Lane',
        city: 'Testville',
        state: 'TS',
        zipCode: '00000',
        country: 'Testland',
        phone: '1234567890'
      },
      paymentMethod: 'cod'
    }, { headers: { Authorization: `Bearer ${token}` } });

    console.log('Order response status:', orderResp.status);
    console.log('Order data:', orderResp.data);

    // 5) Cleanup: optional - remove created product and user
    // await productModel.findByIdAndDelete(product._id);
    // await User.findOneAndDelete({ email });

    console.log('Smoke test completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:');
    if (err.response) {
      console.error('Response status:', err.response.status);
      console.error('Response data:', JSON.stringify(err.response.data, null, 2));
    } else {
      console.error('Error message:', err.message);
    }
    console.error(err.stack);
    process.exit(2);
  }
};

run();
