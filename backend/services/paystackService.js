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
    if (!process.env.PAYSTACK_SECRET_KEY) {
      throw new Error(
        "PAYSTACK_SECRET_KEY is not configured on the server."
      );
    }

    if (!email) {
      throw new Error("Payer email is required.");
    }

    if (!amount || amount <= 0) {
      throw new Error("Payment amount must be greater than zero.");
    }

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
    console.error(
      "Paystack initialization failed:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Unable to initialize Paystack payment."
    );
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
    console.error(
      "Paystack verification failed:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Unable to verify Paystack payment."
    );
  }
};