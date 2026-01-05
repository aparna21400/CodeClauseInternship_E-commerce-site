// BACKEND/models/orders.js
import mongoose from 'mongoose';

/**
 * Order Schema
 * Stores order information including shipping details, payment method, and items
 */
const orderSchema = new mongoose.Schema({
  // User who placed the order
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  
  // Order items with product, size, and quantity
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    size: { 
      type: String, 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: 1 
    },
    price: {
      type: Number,
      required: true
    }
  }],
  
  // Shipping information
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
  },
  
  // Payment information
  paymentMethod: {
    type: String,
    enum: ['card', 'cod', 'paypal'],
    required: true,
    default: 'cod'
  },
  
  // Order totals
  subtotal: { 
    type: Number, 
    required: true 
  },
  shippingFee: { 
    type: Number, 
    default: 0 
  },
  total: { 
    type: Number, 
    required: true 
  },
  
  // Order status
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending' 
  },
  
  // Order tracking
  orderNumber: {
    type: String,
    unique: true,
    required: true
  }
  
}, { timestamps: true });

// Generate unique order number before validation so "required" passes
orderSchema.pre('validate', function() {
  if (!this.orderNumber) {
    // Generate order number: ORD + timestamp + random 4 digits
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(1000 + Math.random() * 9000);
    this.orderNumber = `ORD${timestamp}${random}`;
  }
});

const orderModel = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default orderModel;