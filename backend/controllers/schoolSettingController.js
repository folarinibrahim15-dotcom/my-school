import SchoolSetting from "../models/SchoolSetting.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Get School Settings
|--------------------------------------------------------------------------
*/

export const getSchoolSettings = async (req, res, next) => {
  try {

    let settings = await SchoolSetting.findOne();

    if (!settings) {
      settings = await SchoolSetting.create({
        schoolName: "Sound Peace International Schools",
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update School Settings
|--------------------------------------------------------------------------
*/

export const updateSchoolSettings = async (req, res, next) => {
  try {

    let settings = await SchoolSetting.findOne();

    if (!settings) {
      settings = await SchoolSetting.create({
        schoolName: req.body.schoolName || "Sound Peace International Schools",
      });
    }

    Object.assign(settings, req.body);

    await settings.save();

    res.status(200).json({
      success: true,
      message: "School settings updated successfully.",
      data: settings,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload School Logo
|--------------------------------------------------------------------------
*/

export const uploadSchoolLogo = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a logo.",
      });
    }

    let settings = await SchoolSetting.findOne();

    if (!settings) {
      settings = await SchoolSetting.create({
        schoolName: "Sound Peace International Schools",
      });
    }

    if (settings.logoPublicId) {
      await deleteCloudinaryImage(settings.logoPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "school/logo"
    );

    settings.logo = result.secure_url;
    settings.logoPublicId = result.public_id;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "School logo uploaded successfully.",
      logo: settings.logo,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Principal Photo
|--------------------------------------------------------------------------
*/

export const uploadPrincipalPhoto = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    let settings = await SchoolSetting.findOne();

    if (!settings) {
      settings = await SchoolSetting.create({
        schoolName: "Sound Peace International Schools",
      });
    }

    if (settings.principalPhotoPublicId) {
      await deleteCloudinaryImage(settings.principalPhotoPublicId);
    }

    const result = await uploadToCloudinary(
      req.file,
      "school/principal"
    );

    settings.principalPhoto = result.secure_url;
    settings.principalPhotoPublicId = result.public_id;

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Principal photo uploaded successfully.",
      photo: settings.principalPhoto,
    });

  } catch (error) {
    next(error);
  }
};