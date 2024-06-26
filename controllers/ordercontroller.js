const Order = require('../models/Order');

// Controller functions
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, products, totalAmount } = req.body;
    const newOrder = new Order({ customerName, customerEmail, customerPhone, shippingAddress, products, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, shippingAddress, products, totalAmount, status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { customerName, customerEmail, customerPhone, shippingAddress, products, totalAmount, status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order updated successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
