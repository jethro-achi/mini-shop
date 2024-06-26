const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  products: [{ 
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
