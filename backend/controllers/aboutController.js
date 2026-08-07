import About from "../models/About.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteCloudinaryImage from "../utils/deleteCloudinaryImage.js";

/*
|--------------------------------------------------------------------------
| Get About Page
|--------------------------------------------------------------------------
*/

export const getAbout = async (req, res, next) => {
  try {

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    res.status(200).json({
      success: true,
      data: about,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update About Page
|--------------------------------------------------------------------------
*/

export const updateAbout = async (req, res, next) => {
  try {

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    Object.assign(about, req.body);

    await about.save();

    res.status(200).json({
      success: true,
      message: "About page updated successfully.",
      data: about,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload Principal Image
|--------------------------------------------------------------------------
*/

export const uploadPrincipalImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    if (about.principalImagePublicId) {
      await deleteCloudinaryImage(
        about.principalImagePublicId
      );
    }

    const result = await uploadToCloudinary(
      req.file,
      "about/principal"
    );

    about.principalImage = result.secure_url;
    about.principalImagePublicId = result.public_id;

    await about.save();

    res.status(200).json({
      success: true,
      message: "Principal image uploaded successfully.",
      image: about.principalImage,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Upload History Image
|--------------------------------------------------------------------------
*/

export const uploadHistoryImage = async (req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    const result = await uploadToCloudinary(
      req.file,
      "about/history"
    );

    about.historyImages.push({
      image: result.secure_url,
      imagePublicId: result.public_id,
      caption: req.body.caption || "",
    });

    await about.save();

    res.status(201).json({
      success: true,
      message: "History image uploaded successfully.",
      data: about.historyImages,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete History Image
|--------------------------------------------------------------------------
*/

export const deleteHistoryImage = async (req, res, next) => {
  try {

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page not found.",
      });
    }

    const historyImage = about.historyImages.id(req.params.imageId);

    if (!historyImage) {
      return res.status(404).json({
        success: false,
        message: "History image not found.",
      });
    }

    await deleteCloudinaryImage(historyImage.imagePublicId);

    historyImage.deleteOne();

    await about.save();

    res.status(200).json({
      success: true,
      message: "History image deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Add Core Value
|--------------------------------------------------------------------------
*/

export const addCoreValue = async (req, res, next) => {
  try {

    let about = await About.findOne();

    if (!about) {
      about = await About.create({});
    }

    const { title, description, icon } = req.body;

    about.coreValues.push({
      title,
      description,
      icon,
    });

    await about.save();

    res.status(201).json({
      success: true,
      message: "Core value added successfully.",
      data: about.coreValues,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Update Core Value
|--------------------------------------------------------------------------
*/

export const updateCoreValue = async (req, res, next) => {
  try {

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page not found.",
      });
    }

    const value = about.coreValues.id(req.params.valueId);

    if (!value) {
      return res.status(404).json({
        success: false,
        message: "Core value not found.",
      });
    }

    value.title = req.body.title ?? value.title;
    value.description = req.body.description ?? value.description;
    value.icon = req.body.icon ?? value.icon;

    await about.save();

    res.status(200).json({
      success: true,
      message: "Core value updated successfully.",
      data: value,
    });

  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Delete Core Value
|--------------------------------------------------------------------------
*/

export const deleteCoreValue = async (req, res, next) => {
  try {

    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        success: false,
        message: "About page not found.",
      });
    }

    const value = about.coreValues.id(req.params.valueId);

    if (!value) {
      return res.status(404).json({
        success: false,
        message: "Core value not found.",
      });
    }

    value.deleteOne();

    await about.save();

    res.status(200).json({
      success: true,
      message: "Core value deleted successfully.",
    });

  } catch (error) {
    next(error);
  }
};