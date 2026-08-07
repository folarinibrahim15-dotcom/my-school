import StudentInvoice from "../models/StudentInvoice.js";
import Student from "../models/Student.js";
import FeeStructure from "../models/FeeStructure.js";


/*
|--------------------------------------------------------------------------
| Create Student Invoice
|--------------------------------------------------------------------------
*/

export const createStudentInvoice = async (req, res, next) => {
  try {

    const invoice = await StudentInvoice.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student invoice created successfully.",
      data: invoice,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Student Invoices
|--------------------------------------------------------------------------
*/

export const getStudentInvoices = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      academicSession,
      term,
      classLevel,
      status,
      isActive,
      student,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {
      query.invoiceNumber = {
        $regex: search,
        $options: "i",
      };
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (academicSession) query.academicSession = academicSession;
    if (term) query.term = term;
    if (classLevel) query.classLevel = classLevel;
    if (status) query.status = status;
    if (student) query.student = student;

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const invoices = await StudentInvoice.find(query)
      .populate("student", "firstName lastName admissionNumber")
      .populate("feeStructure", "title totalFee")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await StudentInvoice.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: invoices.length,
      data: invoices,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Student Invoice
|--------------------------------------------------------------------------
*/

export const getStudentInvoice = async (req, res, next) => {
  try {

    const invoice = await StudentInvoice.findById(req.params.id)
      .populate("student")
      .populate("feeStructure");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Student invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Student Invoice
|--------------------------------------------------------------------------
*/

export const updateStudentInvoice = async (req, res, next) => {
  try {

    const invoice = await StudentInvoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Student invoice not found.",
      });
    }

    Object.assign(invoice, req.body);

    await invoice.save();

    res.status(200).json({
      success: true,
      message: "Student invoice updated successfully.",
      data: invoice,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Student Invoice
|--------------------------------------------------------------------------
*/

export const deleteStudentInvoice = async (req, res, next) => {
  try {

    const invoice = await StudentInvoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Student invoice not found.",
      });
    }

    await invoice.deleteOne();

    res.status(200).json({
      success: true,
      message: "Student invoice deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Invoice Status (Enable / Disable)
|--------------------------------------------------------------------------
*/

export const toggleStudentInvoiceStatus = async (req, res, next) => {
  try {

    const invoice = await StudentInvoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Student invoice not found.",
      });
    }

    invoice.isActive = !invoice.isActive;

    await invoice.save();

    res.status(200).json({
      success: true,
      message: `Invoice ${
        invoice.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: invoice,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Outstanding Balance
|--------------------------------------------------------------------------
*/

export const getOutstandingInvoices = async (req, res, next) => {
  try {

    const invoices = await StudentInvoice.find({
      balance: { $gt: 0 },
      isActive: true,
    })
      .populate("student", "firstName lastName admissionNumber")
      .populate("feeStructure", "title");

    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Generate Invoice From Fee Structure
|--------------------------------------------------------------------------
*/

export const generateInvoice = async (req, res, next) => {
  try {

    const { studentId, feeStructureId } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const feeStructure = await FeeStructure.findById(
      feeStructureId
    );

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found.",
      });
    }

    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await StudentInvoice.create({
      student: student._id,
      feeStructure: feeStructure._id,

      invoiceNumber,

      academicSession:
        feeStructure.academicSession,

      term: feeStructure.term,

      classLevel:
        feeStructure.classLevel,

      totalAmount:
        feeStructure.totalFee,

      dueDate:
        feeStructure.paymentDeadline,
    });

    res.status(201).json({
      success: true,
      message: "Invoice generated successfully.",
      data: invoice,
    });

  } catch (error) {
    next(error);
  }
};
