import FeeStructure from "../models/FeeStructure.js";

/*
|--------------------------------------------------------------------------
| Create Fee Structure
|--------------------------------------------------------------------------
*/

export const createFeeStructure = async (req, res, next) => {
  try {

    const feeStructure = await FeeStructure.create(req.body);

    res.status(201).json({
      success: true,
      message: "Fee structure created successfully.",
      data: feeStructure,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Fee Structures (Search + Filter + Pagination)
|--------------------------------------------------------------------------
*/

export const getFeeStructures = async (req, res, next) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      academicSession,
      term,
      classLevel,
      isActive,
    } = req.query;

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          academicSession: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    if (academicSession) {
      query.academicSession = academicSession;
    }

    if (term) {
      query.term = term;
    }

    if (classLevel) {
      query.classLevel = classLevel;
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const feeStructures = await FeeStructure.find(query)
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const total = await FeeStructure.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: feeStructures.length,
      data: feeStructures,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Fee Structure
|--------------------------------------------------------------------------
*/

export const getFeeStructure = async (req, res, next) => {
  try {

    const feeStructure = await FeeStructure.findById(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: feeStructure,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Fee Structure
|--------------------------------------------------------------------------
*/

export const updateFeeStructure = async (req, res, next) => {
  try {

    const feeStructure = await FeeStructure.findById(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found.",
      });
    }

    Object.assign(feeStructure, req.body);

    await feeStructure.save();

    res.status(200).json({
      success: true,
      message: "Fee structure updated successfully.",
      data: feeStructure,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Fee Structure
|--------------------------------------------------------------------------
*/

export const deleteFeeStructure = async (req, res, next) => {
  try {

    const feeStructure = await FeeStructure.findById(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found.",
      });
    }

    await feeStructure.deleteOne();

    res.status(200).json({
      success: true,
      message: "Fee structure deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Fee Structure Status
|--------------------------------------------------------------------------
*/

export const toggleFeeStructureStatus = async (req, res, next) => {
  try {

    const feeStructure = await FeeStructure.findById(req.params.id);

    if (!feeStructure) {
      return res.status(404).json({
        success: false,
        message: "Fee structure not found.",
      });
    }

    feeStructure.isActive = !feeStructure.isActive;

    await feeStructure.save();

    res.status(200).json({
      success: true,
      message: `Fee structure ${
        feeStructure.isActive
          ? "enabled"
          : "disabled"
      } successfully.`,
      data: feeStructure,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Active Fee Structures
|--------------------------------------------------------------------------
*/

export const getActiveFeeStructures = async (req, res, next) => {
  try {

    const feeStructures = await FeeStructure.find({
      isActive: true,
    }).sort({
      displayOrder: 1,
      classLevel: 1,
      term: 1,
    });

    res.status(200).json({
      success: true,
      count: feeStructures.length,
      data: feeStructures,
    });

  } catch (error) {
    next(error);
  }
};
