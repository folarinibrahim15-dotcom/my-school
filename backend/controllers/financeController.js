import Finance from "../models/Finance.js";

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

export const createPayment = async (req, res, next) => {

    try {

        const payment = await Finance.create(req.body);

        res.status(201).json({

            success: true,

            message: "Payment recorded successfully.",

            data: payment,

        });

    } catch (error) {

        next(error);

    }

};

/*
|--------------------------------------------------------------------------
| Get Payments (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getPayments = async (req, res, next) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const status = req.query.status || "";

        const paymentType = req.query.paymentType || "";

        const query = {};

        if (search) {

            query.$or = [

                {

                    studentName: {

                        $regex: search,

                        $options: "i",

                    },

                },

                {

                    receiptNumber: {

                        $regex: search,

                        $options: "i",

                    },

                },

            ];

        }

        if (status) {

            query.status = status;

        }

        if (paymentType) {

            query.paymentType = paymentType;

        }

        const payments = await Finance.find(query)

            .populate("student", "firstName lastName")

            .sort({ createdAt: -1 })

            .skip(skip)

            .limit(limit);

        const total = await Finance.countDocuments(query);

        res.status(200).json({

            success: true,

            total,

            page,

            pages: Math.ceil(total / limit),

            count: payments.length,

            data: payments,

        });

    } catch (error) {

        next(error);

    }

};

/*
|--------------------------------------------------------------------------
| Get Single Payment
|--------------------------------------------------------------------------
*/

export const getPayment = async (req, res, next) => {

    try {

        const payment = await Finance.findById(req.params.id)

            .populate("student");

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found.",

            });

        }

        res.status(200).json({

            success: true,

            data: payment,

        });

    } catch (error) {

        next(error);

    }

};

/*
|--------------------------------------------------------------------------
| Update Payment
|--------------------------------------------------------------------------
*/

export const updatePayment = async (req, res, next) => {

    try {

        const payment = await Finance.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true,

            }

        );

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found.",

            });

        }

        res.status(200).json({

            success: true,

            message: "Payment updated successfully.",

            data: payment,

        });

    } catch (error) {

        next(error);

    }

};

/*
|--------------------------------------------------------------------------
| Delete Payment
|--------------------------------------------------------------------------
*/

export const deletePayment = async (req, res, next) => {

    try {

        const payment = await Finance.findById(req.params.id);

        if (!payment) {

            return res.status(404).json({

                success: false,

                message: "Payment not found.",

            });

        }

        await payment.deleteOne();

        res.status(200).json({

            success: true,

            message: "Payment deleted successfully.",

        });

    } catch (error) {

        next(error);

    }

};