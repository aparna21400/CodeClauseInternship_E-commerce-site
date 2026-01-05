// scripts/orderUnauthTest.js
// Simple test that attempts to place an order without authentication and expects 401
import axios from 'axios';
import 'dotenv/config';

const base = process.env.BASE_URL || 'http://127.0.0.1:5000';

async function run() {
  try {
    const url = `${base}/api/orders`;
    const body = {
      shippingAddress: {
        fullName: 'Unauth Test',
        address: 'No Auth Road',
        city: 'Nowhere',
        state: 'NA',
        zipCode: '00000',
        country: 'Nowhere',
        phone: '0000000000'
      },
      paymentMethod: 'cod'
    };

    const res = await axios.post(url, body, {
      validateStatus: () => true // we will assert status ourselves
    });

    console.log('Response status:', res.status);
    console.log('Response data:', res.data);

    if (res.status === 401) {
      console.log('✅ Unauthenticated order creation correctly rejected');
      process.exit(0);
    }

    console.error('❌ Expected 401 but got', res.status);
    process.exit(2);
  } catch (error) {
    console.error('Test error:', error?.response?.data || error.message || error);
    process.exit(2);
  }
}

run();
