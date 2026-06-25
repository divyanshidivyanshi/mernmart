import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // IMPORTANT: paise
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};