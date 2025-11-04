import express from "express";
import {
  mpesaPassword,
  stkPush,
  token,
} from "../controllers/mpesaController.js";
// import Order from '../models/userModel.js'; // Assuming you have an Order model

const router = express.Router();

// Test route to get password
router.get("/password", mpesaPassword);

// M-Pesa STK push (expects amount, phone, and orderId in body)
router.post("/payments/mpesa", token, stkPush);

// Callback route for M-Pesa (this is where M-Pesa sends the payment status)
router.post("/payments/mpesa/callback", async (req, res) => {
  try {
    const callbackData = req.body.Body?.stkCallback;

    // If no callback data, return an error response
    if (!callbackData) {
      return res.status(400).send({ message: "Invalid callback payload" });
    }

    const { ResultCode, ResultDesc } = callbackData;

    // If payment failed or was cancelled
    if (ResultCode !== 0) {
      console.log(`M-Pesa Payment failed: ${ResultDesc}`);
      return res.status(200).send({ message: "Payment failed or cancelled" });
    }

    // // Find the order by CheckoutRequestID (assuming you saved this when initiating STK push)
    // const order = await Order.findOne({ mpesaCheckoutRequestID: CheckoutRequestID });

    // if (!order) {
    //   return res.status(404).send({ message: 'Order not found for payment' });
    // }

    // // Update the order if not already marked as paid
    // if (!order.isPaid) {
    //   order.isPaid = true;
    //   order.paidAt = new Date();
    //   order.paymentResult = {
    //     id: CallbackMetadata?.Item.find(i => i.Name === 'MpesaReceiptNumber')?.Value,
    //     status: 'Completed',
    //     update_time: new Date(),
    //     email_address: order.user?.email || '', // Assuming order has a user field
    //   };

    //   await order.save();
    //   console.log(`Order ${order.id} marked as paid`);
    // }

    res.status(200).send({ message: "Payment processed successfully" });
  } catch (err) {
    console.error("M-Pesa callback error:", err.message);
    res.status(500).send({ message: "Server error in callback" });
  }
});

export default router;
