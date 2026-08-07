import axios from "axios";

/*
|--------------------------------------------------------------------------
| Initialize Payment
|--------------------------------------------------------------------------
*/

export const initializePaystackPayment = async ({
  email,
  amount,
  reference,
  callback_url,
  metadata,
}) => {
  try {
    // console.log("\n========== PAYSTACK REQUEST ==========");
    // console.log("Secret Key:", process.env.PAYSTACK_SECRET_KEY);
    // console.log("Email:", email);
    // console.log("Amount:", amount);
    // console.log("Reference:", reference);
    // console.log("Callback URL:", callback_url);
    // console.log("Metadata:", metadata);
    // console.log("======================================\n");

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        reference,
        callback_url,
        metadata,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
  // console.log("\n========== PAYSTACK ERROR ==========");
  // console.log("Message:", error.message);
  // console.log("Code:", error.code);
  // console.log("Status:", error.response?.status);
  // console.log("Response:", error.response?.data);
  // console.log("Stack:", error.stack);
  // console.log("====================================\n");

  throw error;
}
};

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

export const verifyPaystackPayment = async (reference) => {
  try {
    console.log("Verifying:", reference);

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // console.log("\n========== VERIFY ERROR ==========");
    // console.log("Reference:", reference);
    // console.log("Status:", error.response?.status);
    // console.log("Data:", error.response?.data);
    // console.log("=================================\n");

    throw error;
  }
};