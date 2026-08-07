import Department from "../models/Department.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Create Department
|--------------------------------------------------------------------------
*/

export const createDepartment = async (req, res, next) => {
  try {

    const department = await Department.create(req.body);

    const populatedDepartment = await Department.findById(department._id)
      .populate("academicLevel", "name slug");

    res.status(201).json({
      success: true,
      message: "Department created successfully.",
      data: populatedDepartment,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get All Departments
|--------------------------------------------------------------------------
*/

export const getDepartments = async (req, res, next) => {
  try {

    const departments = await Department.find()
      .populate("academicLevel", "name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Department
|--------------------------------------------------------------------------
*/

export const getDepartment = async (req, res, next) => {
  try {

    const department = await Department.findById(req.params.id)
      .populate("academicLevel", "name slug");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: department,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Department
|--------------------------------------------------------------------------
*/

export const updateDepartment = async (req, res, next) => {
  try {

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("academicLevel", "name slug");

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully.",
      data: department,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Department
|--------------------------------------------------------------------------
*/

export const deleteDepartment = async (req, res, next) => {
  try {

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    if (department.imagePublicId) {
      await deleteCloudinaryImage(department.imagePublicId);
    }

    await department.deleteOne();

    res.status(200).json({
      success: true,
      message: "Department deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Department Image
|--------------------------------------------------------------------------
*/

export const uploadDepartmentImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    if (department.imagePublicId) {
      await deleteCloudinaryImage(department.imagePublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "departments"
    );

    department.image = result.secure_url;
    department.imagePublicId = result.public_id;

    await department.save();

    res.status(200).json({
      success: true,
      message: "Department image uploaded successfully.",
      image: department.image,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Toggle Department Status
|--------------------------------------------------------------------------
*/

export const toggleDepartmentStatus = async (req, res, next) => {
  try {

    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found.",
      });
    }

    department.isActive = !department.isActive;

    await department.save();

    res.status(200).json({
      success: true,
      message: `Department ${
        department.isActive ? "enabled" : "disabled"
      } successfully.`,
      data: department,
    });

  } catch (error) {
    next(error);
  }
};