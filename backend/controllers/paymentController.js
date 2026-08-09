import Admission from "../models/Admission.js";
import Payment from "../models/Payment.js";

import generatePaymentReference from "../utils/generatePaymentReference.js";

import {
  initializePaystackPayment,
  verifyPaystackPayment,
} from "../services/paystackService.js";

/*
|--------------------------------------------------------------------------
| Initialize Payment
|--------------------------------------------------------------------------
*/

export const initializePayment = async (
  req,
  res,
  next
) => {
  try {
    const { admissionId } = req.body;

const admission = await Admission.findById(admissionId);

if (!admission) {
  return res.status(404).json({
    success: false,
    message: "Admission not found.",
  });
}

console.log("Admission Found:");


    const reference =
      generatePaymentReference();

    const amount = 15000; // ₦15000 Admission Form Fee

    const payment = await Payment.create({
      admission: admission._id,

      paymentReference: reference,

      payerName: admission.parentName,

      payerEmail: admission.parentEmail,

      payerPhone: admission.parentPhone,

      studentName: `${admission.firstName} ${admission.lastName}`,

      classApplyingFor:
        admission.classApplyingFor,

      amount,

      paymentPurpose: "Admission Form",
    });

    const paystack =
      await initializePaystackPayment({
        email: payment.payerEmail,
        amount: amount * 100, // Convert to kobo
        reference,

        callback_url:
          process.env.PAYSTACK_CALLBACK_URL,

        metadata: {
          paymentId: payment._id,

          admissionId: admission._id,
        },
      });

    return res.status(200).json({
      success: true,

      payment,

      authorization_url:
        paystack.data.authorization_url,

      reference,
    });
  } catch (error) {
    next(error);
  }
};

export const initializeSchoolFeesPayment = async (
  req,
  res,
  next
) => {
  try {

    const {
      payerName,
      email,
      phone,
      studentName,
      studentClass,
      paymentCategory,
      amount,
      breakdown,
    } = req.body;

    const reference = generatePaymentReference();

    const payment = await Payment.create({

      payerName,

      payerEmail: email,

      payerPhone: phone,

      studentName,

      classApplyingFor: studentClass,

      amount,

      paymentPurpose: paymentCategory,

      breakdown,

      paymentReference: reference,

    });

    const paystack =
      await initializePaystackPayment({

        email,

        amount: amount * 100,

        reference,

        callback_url:
          process.env.PAYSTACK_CALLBACK_URL,

        metadata: {

          paymentId: payment._id,

          paymentType: "School Fees",

        },

      });

    return res.status(200).json({

      success: true,

      authorization_url:
        paystack.data.authorization_url,

      reference,

      payment,

    });

  } catch (error) {

    next(error);

  }
};

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

export const verifyPayment = async (req, res, next) => {
  try {
    const { reference } = req.params;

    const paystack = await verifyPaystackPayment(reference);

    console.log("\n========== PAYSTACK VERIFY RESPONSE ==========");
    console.log(paystack);
    console.log("=============================================\n");

    const payment = await Payment.findOne({
      paymentReference: reference,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    const admission = await Admission.findById(payment.admission);

    const transactionStatus = paystack.data.status;

    switch (transactionStatus) {
      case "success":
        payment.status = "Successful";
        payment.verified = true;
        payment.gatewayResponse = paystack.data.gateway_response;
        payment.transactionReference = paystack.data.reference;
        payment.paidAt = new Date(paystack.data.paid_at);

        await payment.save();

        if (admission) {
          admission.paymentStatus = "Paid";
          admission.payment = payment._id;
          await admission.save();
        }

        return res.status(200).json({
          success: true,
          message: "Payment verified successfully.",
          payment,
          admission,
        });

      case "pending":
        payment.status = "Pending";
        await payment.save();

        return res.status(202).json({
          success: false,
          message: "Payment is still pending.",
          payment,
        });

      case "abandoned":
        payment.status = "Abandoned";
        await payment.save();

        return res.status(400).json({
          success: false,
          message: "Payment was abandoned.",
          payment,
        });

      case "failed":
      default:
        payment.status = "Failed";
        payment.gatewayResponse =
          paystack.data.gateway_response || "";

        await payment.save();

        return res.status(400).json({
          success: false,
          message: "Payment failed.",
          payment,
        });
    }
  } catch (error) {
    next(error);
  }
};


/*
|--------------------------------------------------------------------------
| Get Payment Receipt
|--------------------------------------------------------------------------
*/

export const getPaymentReceipt = async (
  req,
  res,
  next
) => {

  try {

    const { reference } = req.params;

    const payment = await Payment.findOne({
      paymentReference: reference,
    }).populate("admission");

    if (!payment) {

      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });

    }

    return res.status(200).json({

      success: true,

      payment,

      admission: payment.admission || null,

    });

  } catch (error) {

    next(error);

  }

};