import Receipt from "../models/Receipt.js";
import Payment from "../models/Payment.js";
import generateReceiptPDF from "../utils/generateReceiptPDF.js"
import sendReceiptEmail from "../utils/sendReceiptEmail.js";


/*
|--------------------------------------------------------------------------
| Create Receipt
|--------------------------------------------------------------------------
*/

export const createReceipt = async (req, res, next) => {
  try {

    const payment = await Payment.findById(req.body.payment);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    const receipt = await Receipt.create(req.body);

    res.status(201).json({
      success: true,
      message: "Receipt created successfully.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Receipts
|--------------------------------------------------------------------------
*/

export const getReceipts = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      paymentMethod,
      student,
      invoice,
      payment,
      isPrinted,
      isEmailed,
      isActive,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {
      query.receiptNumber = {
        $regex: search,
        $options: "i",
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (paymentMethod) query.paymentMethod = paymentMethod;
    if (student) query.student = student;
    if (invoice) query.invoice = invoice;
    if (payment) query.payment = payment;

    if (isPrinted !== undefined) {
      query.isPrinted = isPrinted === "true";
    }

    if (isEmailed !== undefined) {
      query.isEmailed = isEmailed === "true";
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const receipts = await Receipt.find(query)
      .populate("student", "firstName lastName admissionNumber")
      .populate("invoice", "invoiceNumber")
      .populate("payment", "paymentReference amount")
      .populate("issuedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Receipt.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: receipts.length,
      data: receipts,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Receipt
|--------------------------------------------------------------------------
*/

export const getReceipt = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id)
      .populate("student")
      .populate("invoice")
      .populate("payment")
      .populate("issuedBy");

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Receipt
|--------------------------------------------------------------------------
*/

export const updateReceipt = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    Object.assign(receipt, req.body);

    await receipt.save();

    res.status(200).json({
      success: true,
      message: "Receipt updated successfully.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Receipt
|--------------------------------------------------------------------------
*/

export const deleteReceipt = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    await receipt.deleteOne();

    res.status(200).json({
      success: true,
      message: "Receipt deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Generate Receipt Automatically
|--------------------------------------------------------------------------
*/

export const generateReceipt = async (req, res, next) => {
  try {

    const payment = await Payment.findById(req.params.paymentId)
      .populate("invoice")
      .populate("student");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    const existingReceipt = await Receipt.findOne({
      payment: payment._id,
    });

    if (existingReceipt) {
      return res.status(400).json({
        success: false,
        message: "Receipt already exists for this payment.",
      });
    }

    const receipt = await Receipt.create({
      receiptNumber: `RCT-${Date.now()}`,
      payment: payment._id,
      invoice: payment.invoice._id,
      student: payment.student._id,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      paymentDate: payment.paymentDate,
      remarks: payment.remarks,
      issuedBy: payment.receivedBy,
    });

    res.status(201).json({
      success: true,
      message: "Receipt generated successfully.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Mark Receipt as Printed
|--------------------------------------------------------------------------
*/

export const markReceiptPrinted = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    receipt.isPrinted = true;

    await receipt.save();

    res.status(200).json({
      success: true,
      message: "Receipt marked as printed.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Mark Receipt as Emailed
|--------------------------------------------------------------------------
*/

export const markReceiptEmailed = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    receipt.isEmailed = true;

    await receipt.save();

    res.status(200).json({
      success: true,
      message: "Receipt marked as emailed.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Enable / Disable Receipt
|--------------------------------------------------------------------------
*/

export const toggleReceiptStatus = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id);

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    receipt.isActive = !receipt.isActive;

    await receipt.save();

    res.status(200).json({
      success: true,
      message: `Receipt ${
        receipt.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Receipt Statistics
|--------------------------------------------------------------------------
*/

export const receiptStatistics = async (req, res, next) => {
  try {

    const totalReceipts = await Receipt.countDocuments();

    const printedReceipts = await Receipt.countDocuments({
      isPrinted: true,
    });

    const emailedReceipts = await Receipt.countDocuments({
      isEmailed: true,
    });

    const activeReceipts = await Receipt.countDocuments({
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: {
        totalReceipts,
        printedReceipts,
        emailedReceipts,
        activeReceipts,
      },
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Download Receipt PDF
|--------------------------------------------------------------------------
*/

export const downloadReceiptPDF = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id)
      .populate("student")
      .populate("invoice")
      .populate("payment");

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    generateReceiptPDF(receipt, res);

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Email Receipt
|--------------------------------------------------------------------------
*/

export const emailReceipt = async (req, res, next) => {
  try {

    const receipt = await Receipt.findById(req.params.id)
      .populate("student")
      .populate("invoice")
      .populate("payment");

    if (!receipt) {
      return res.status(404).json({
        success: false,
        message: "Receipt not found.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Student Email
    |--------------------------------------------------------------------------
    */

    const recipientEmail =
      receipt.student.parentEmail ||
      receipt.student.email;

    if (!recipientEmail) {
      return res.status(400).json({
        success: false,
        message: "No email address found for this student.",
      });
    }

    await sendReceiptEmail({
      to: recipientEmail,

      studentName:
        `${receipt.student.firstName} ${receipt.student.lastName}`,

      receiptNumber: receipt.receiptNumber,

      amount: receipt.amount,

      paymentMethod: receipt.paymentMethod,

      paymentDate: receipt.paymentDate,
    });

    receipt.isEmailed = true;

    await receipt.save();

    res.status(200).json({
      success: true,
      message: "Receipt emailed successfully.",
      data: receipt,
    });

  } catch (error) {
    next(error);
  }
};
