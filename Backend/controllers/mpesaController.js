import dotenv from "dotenv";
import datetime from "node-datetime";
import API from "../api"; // adjust the path if needed

// import Order from '../models/orderModel.js'; // Assuming you have an Order model

dotenv.config();

const passkey = process.env.PASSKEY;
const shortcode = process.env.SHORTCODE || "174379"; // fallback to test code
const consumerKey = process.env.CONSUMERKEY;
const consumerSecret = process.env.CONSUMERSECRET;

// Generates Base64-encoded password for STK push
const generateMpesaPassword = () => {
  const dt = datetime.create();
  const formatted = dt.format("YmdHMS");

  const passString = shortcode + passkey + formatted;
  const base64EncodedPassword = Buffer.from(passString).toString("base64");

  return { password: base64EncodedPassword, timestamp: formatted };
};

// Middleware to fetch access token
export const token = async (req, res, next) => {
  try {
    const url =
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    const auth =
      "Basic " +
      Buffer.from(consumerKey + ":" + consumerSecret).toString("base64");

    const headers = { Authorization: auth };

    const response = await API.get(url, { headers });
    req.token = response.data.access_token;
    next();
  } catch (error) {
    console.error("M-Pesa token error:", error.message);
    res.status(500).send({ message: "Failed to generate access token" });
  }
};

// Route to test password
export const mpesaPassword = (req, res) => {
  res.send(generateMpesaPassword().password);
};

// STK push controller (dynamic)
export const stkPush = async (req, res) => {
  try {
    let { amount, phone, orderId } = req.body;

    if (!amount || !phone || !orderId) {
      return res.status(400).send({ message: "Missing required payment info" });
    }

    // Convert phone to international format if needed
    if (phone.startsWith("0")) {
      phone = "254" + phone.substring(1);
    }

    const { password, timestamp } = generateMpesaPassword();

    const stkURL =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const data = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: shortcode,
      PhoneNumber: phone,
      CallBackURL: "https://mydomain.com/api/payments/mpesa/callback", // Change to your live callback URL
      AccountReference: "GhalaMart Enterprises Payment",
      TransactionDesc: "Order payment",
    };

    const headers = {
      Authorization: `Bearer ${req.token}`,
    };

    const response = await API.post(stkURL, data, { headers });

    //   // Save the CheckoutRequestID in the order
    //   await Order.findByIdAndUpdate(orderId, {
    //     mpesaCheckoutRequestID: response.data.CheckoutRequestID,
    //   });

    res.send({
      success: true,
      message: "STK Push initiated. Check your phone.",
      data: response.data,
    });
  } catch (error) {
    console.error("STK push error:", error.response?.data || error.message);
    res.status(500).send({
      message: "M-Pesa STK push failed",
      error: error.response?.data || error.message,
    });
  }
};

// Callback handler for M-Pesa payment status
export const mpesaCallback = async (req, res) => {
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
};
